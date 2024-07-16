const notificaciones = document.querySelector(".notificaciones")
const notificacionesSelect = document.querySelector(".notificacionesModal")

async function dataJSON() {
    const response = await fetch("../js/utils/db-notificaciones.json");
    const { notifications } = await response.json();
    notificationsList(notifications, notificaciones)
    notificationsList(notifications, notificacionesSelect)
}

dataJSON();

const dataUsersLocal = JSON.parse(localStorage.getItem('posts'))

function notificationsList(notificationsToLoop, containerNotifications) {

    notificationsToLoop.forEach(notification => {
        const userFound = dataUsersLocal.find(user => user.user.id === notification.content.userId)

        if (notification.content.userId === userFound.user.id) {
            const contenedorNotificatios = document.createElement("div");
            contenedorNotificatios.innerHTML += `
            <div class="notificacion"> 
                <div class="imgNotifications">
                    <img src=${userFound.user.profile_picture} >
                </div>
                <div class="notificationData">
                    <div class="titulo">${notification.content.username}</div>
                    <div class="contenido">
                        ${notification.type === "comment" ?
                    `<p>Commented on your post: "${notification.content.commentText}"</p>` :
                    `<p>Liked your post: "${notification.content.postTitle}"</p>`}
                        <span class="timestamp">${new Date(notification.content.timestamp).toLocaleString()}</span>
                    </div>
                </div>
            </div>  
            `
            containerNotifications?.appendChild(contenedorNotificatios);
        }
    })
}


export default notificationsList