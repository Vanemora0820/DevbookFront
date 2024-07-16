const modalNotifications = document.getElementById("modal-notifications")
const btnNotifications = document.getElementById("notifications")
const closeNotifications = document.getElementById("close-notifications")
const btnNotificationsDesktop = document.getElementById("btn-notifications-desktop")


btnNotifications.addEventListener("click", () => {
    modalNotifications.classList.toggle("hidden-notifications")
})

btnNotificationsDesktop?.addEventListener("click", () => {
    modalNotifications.classList.toggle("hidden-notifications")
})

closeNotifications.addEventListener("click", () => {
    modalNotifications.classList.add("hidden-notifications")
})
