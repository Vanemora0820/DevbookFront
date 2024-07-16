const modalConfiguration = document.getElementById("modal-configuration")
const btnConfiguration = document.getElementById("btn-config")


btnConfiguration.addEventListener("click", () => {
    modalConfiguration.classList.toggle("hidden-setting")
})


modalConfiguration.innerHTML = `
    <p>Configuración</p>
    <div class="btn-configuration dark-mode">
        <i class='bx bx-moon'></i>
        <p>Modo claro</p>
    </div>
    <div class="btn-configuration languaje">
        <i class='bx bx-rupee'></i>
        <p>Idioma</p>
        <select>
            <option value="en">🇺🇸</option>
            <option value="es">🇪🇸</option>
        </select>
    </div>
    <div class="btn-configuration logout" id="logout">
        <i class='bx bx-log-out-circle'></i>
        <p>Salir</p>
    </div>`

const btnLogout = document.getElementById("logout")

btnLogout.addEventListener('click', () => {
    window.location.href = '../index.html'
})