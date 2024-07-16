let nombreInput = document.getElementById("name")
let emailInput = document.getElementById("email")
let mensajeInput = document.getElementById("message")

nombreInput.addEventListener("input",creadorEscuchador(nombreValido))
emailInput.addEventListener("input",creadorEscuchador(emailValido))
mensajeInput.addEventListener("input",creadorEscuchador(mensajeValido))

function nombreValido(nombreInput) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){0,5}$/.test(nombreInput.trim());
}

function emailValido(emailInput) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
}

function mensajeValido(mensajeInput) {
    const cuenta = (mensajeInput.trim().match(/\b\w+(['-]?\w+)*\b/g) || []).length
    return cuenta <= 100;
}

function creadorEscuchador(validador) {
    return function (e) {
        let input = e.target
        let text = input.value
        let valid = validador(text)
        let error = text!=="" && !valid
        let errorMensaje = input.nextElementSibling
        mostrarOcultar(error, errorMensaje, input)
    }

}

function mostrarOcultar(error, errorMessage, input) {
    if (error) {
        errorMessage.textContent = input.getAttribute('data-error-message');
        input.classList.add("invalid");
    } else {
        errorMessage.textContent = "";
        input.classList.remove("invalid");
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.inputs input, .inputs textarea');

    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            input.classList.add('filled');
        }

        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });
});