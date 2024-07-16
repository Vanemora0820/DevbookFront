// Funcionalidad del menu
const mediaQuery = window.matchMedia("(min-width: 744px)")
const burguer = document.getElementById("burguer")
const menuContainerContact = document.getElementById("menuContainerContact")
const closeMenu = document.getElementById("closeMenu")
const showSearcher = document.getElementById("label")
const inputSearch = document.getElementById("inputSearch")
const containerSearchContact = document.getElementById("containerSearchContact")
const logo = document.getElementById("logo-menu")
const btnSearchContact = document.getElementById("btnSearchContact")
const linkWeb = document.getElementsByClassName("nav-menu-item")
const url = window.location.pathname

// Esta funcion muestra el menu en pantallas moviles y en tablet
burguer.addEventListener("click", function () {
    menuContainerContact.classList.toggle("mostrar-menu")
})

// Esta funcion cierra el menu en pantallas moviles y en tablet
closeMenu.addEventListener("click", function () {
    menuContainerContact.classList.remove("mostrar-menu")
})

// Esta funcion muestra el buscador en pantallas moviles
if (!mediaQuery.matches) {
    showSearcher.addEventListener("click", function () {
        containerSearchContact.classList.toggle("show-input")
        containerSearchContact.style = "width: 250px"
        showSearcher.style = "left: 90%"
        logo.style = "display: none"
        btnSearchContact.style = "display: flex"
        showSearcher.style = "display: none"

    })
}


// Esta funcion indica en que pagina estas
const webName = Array.from(linkWeb)
const fracmentowebName = webName.map((ele) => {
    window.addEventListener('load', () => {
        const hashData = ele.getAttribute('href')
        const referenceName = hashData.split("#")
        const nameHash = referenceName[1]

        if (url.includes(nameHash)) {
            ele.classList.add("nav-activo")
        }
    })
    ele.addEventListener("click", function (e) {
        const hashData = e.target.hash
        const referenceName = hashData.split("#")
        const nameHash = referenceName[1]

        if (url.includes(nameHash)) {
            ele.classList.add("nav-activo")
        }


    })
})
// Finaliza funcionalidad del menu