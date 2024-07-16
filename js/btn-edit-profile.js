// Funcionalidad del boton para editar perfil
const mediaQuery = window.matchMedia("(min-width: 744px)")
const btn_edit_profile = document.getElementById("btn-edit-profile")
const container_profile = document.getElementById("container-profile")
const btn_close_menu_profile = document.getElementById("close-menu-profile")
const container_details_profile_configuration = document.getElementById("container-details-profile-configuration")
const containerProfileConfiguration = document.getElementById("container-profile-configuration")
const details = document.getElementById("details")
const configuration = document.getElementById("configuration")


// Esta funcion muestra el menu de editar perfil en pantallas moviles 
btn_edit_profile.addEventListener("click", function () {
    container_profile.classList.toggle("mostrar-menu")
    containerProfileConfiguration.classList.toggle("mostrar-menu")
    // container_details_profile_configuration.style.display = "grid"
    // details.style.display = "none"
    // configuration.style.display = "none"
})

// Esta funcion cierra el menu de editar perfil en pantallas moviles y en tablet
btn_close_menu_profile.addEventListener("click", function () {
    container_profile.classList.remove("mostrar-menu")
    containerProfileConfiguration.classList.remove("mostrar-menu")

    // container_details_profile_configuration.style.display = "none"
})
