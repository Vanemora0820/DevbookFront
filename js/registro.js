import { modalValidaciones } from "../components/modal-validaciones.js";
import { getAllData, postData } from "./fetching.js";

const modalValidations = document.getElementById("movalValidations")

const registerFormPart1 = document.getElementById('register-form-part1')
const emailInputRegister = document.getElementById("email")

const registerFormPart2 = document.getElementById("register-form-part2")
const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const infoError = document.getElementById("infoError")
const password = document.getElementById("password")
const country = document.getElementById("country")
const phone = document.getElementById("phone")
const gender = document.getElementById("gender")
const birthday = document.getElementById("birthday")
const role = document.getElementById("role")
const stack = document.getElementById("stack")
const btnCancelResgister = document.getElementById("btnCancelResgister")

// const usersLocal = JSON.parse(localStorage.getItem('users'))

let usersData = await getAllData('http://localhost:8080/api/getUsers')
let countriesData = await getAllData('http://localhost:8080/api/country/getCountries')
let gendersData = await getAllData('http://localhost:8080/api/gender/getGenders')
let rolesData = await getAllData('http://localhost:8080/api/rol/getRoles')
let stacksData = await getAllData('http://localhost:8080/api/stack/getStacks')

countriesData.map(data => country.innerHTML += `<option value="${data.id}">${data.name}</option>`)
gendersData.map(data => gender.innerHTML += `<option value="${data.id}">${data.name}</option>`)
rolesData.map(data => role.innerHTML += `<option value="${data.id}">${data.rol}</option>`)
stacksData.map(data => stack.innerHTML += `<option value="${data.id}">${data.name}</option>`)


// Validación del formulario del correo
registerFormPart1.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = emailInputRegister.value

    if (!emailInput.includes("@")) {
        return modalValidaciones(modalValidations, "Tipo de correo electrónico inválido", infoError)
    }

    if (usersData !== null) {
        const emailFound = usersData.find(user => emailInput === user.email)

        if (!emailFound) {
            modalValidations.style.right = "-100%"

            registerFormPart1.style.display = 'none';
            registerFormPart2.style.display = 'flex';
        } else {
            return modalValidaciones(modalValidations, 'Esta cuenta de correo ya existe', infoError)

        }

    } else {
        registerFormPart1.style.display = 'none';
        registerFormPart2.style.display = 'flex'
    }


})


// Validación del formulario de registro completo
// let arrayUsers = []

// if (usersLocal !== null) {
//     arrayUsers = usersLocal
// }


registerFormPart2.addEventListener('submit', (e) => {
    e.preventDefault()

    if (nombre.value === '' || nombre.value.length < 3) {
        return modalValidaciones(modalValidations, "Nombre de usuario inválido", infoError)
    }
    if (apellido.value === '' || apellido.value.length < 3) {
        return modalValidaciones(modalValidations, "Apellido de usuario inválido", infoError)
    }
    if (password.value.length < 8 || password.value.length > 16) {
        return modalValidaciones(modalValidations, "La contraseña debe tener mínimo 8 carácteres y máximo 16", infoError)
    }
    if (!country.value) {
        return modalValidaciones(modalValidations, "Selecciona un país", infoError)
    }
    if (isNaN(phone.value) || phone.value === '' || phone.value.length < 10) {
        return modalValidaciones(modalValidations, "Ingresa un número de teléfono válido", infoError)
    }
    if (!gender.value) {
        return modalValidaciones(modalValidations, "Selecciona un género", infoError)
    }
    if (!birthday.value) {
        return modalValidaciones(modalValidations, "Ingresa una fecha de nacimiento", infoError)
    }
    if (!role.value) {
        return modalValidaciones(modalValidations, "Ingresa el role en el que te desmpeñas", infoError)
    }
    if (!stack.value) {
        return modalValidaciones(modalValidations, "Ingresa el lenguaje de programación que manejas", infoError)
    }


    const countryDB = countriesData.find(countryData => countryData.id == country.value)
    const genderDB = gendersData.find(genderData => genderData.id == gender.value)
    const roleDB = rolesData.find(roleData => roleData.id == role.value)
    const stackDB = stacksData.find(stackData => stackData.id == stack.value)
    const roleComplete = [{
        "id": roleDB.id,
        "rol": roleDB.rol,
        "stacks": [
            {
                "id": stackDB.id,
                "name": stackDB.name
            }
        ]
    }]


    const newUser = {
        "username": nombre.value,
        "surname": apellido.value,
        "email": emailInputRegister.value,
        "password": password.value,
        "phone": phone.value,
        "dateOfBirth": birthday.value,
        "gender": genderDB,
        "roles": roleComplete,
        "country": countryDB
    }

    // arrayUsers.push(newUser)

    postData('http://localhost:8080/api', newUser).then(data => console.log(data))

    // localStorage.setItem('users', JSON.stringify(arrayUsers))

    emailInputRegister.value = '';

    modalValidations.style.right = '-100%'

    window.location.href = '/views/ingreso.html'
    console.log(country.value)

    registerFormPart2.reset()

})

btnCancelResgister.addEventListener('click', () => {
    registerFormPart2.style.display = "none"
    registerFormPart1.style.display = "flex"
})

