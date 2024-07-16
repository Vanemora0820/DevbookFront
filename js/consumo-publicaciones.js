import { commentsByPost } from "./modal-comments.js";

const publicaciones = document.getElementById("publicaciones");
const listaAmigos = document.querySelector(".lista-amigos")
const postsUsers = document.getElementsByClassName("tarjeta")
const containerComment = document.querySelector(".containerComment")

const openComments = document.getElementById("btnComment")
const commentModal = document.querySelector(".commentModal")




async function dataJSON() {
    const response = await fetch("../js/utils/db-publicaciones.json");
    const { posts } = await response.json();

    const dataToString = JSON.stringify(posts)

    const postsLocalStorage = JSON.parse(localStorage.getItem('posts'))

    if (!postsLocalStorage) {
        localStorage.setItem('posts', dataToString)
        location.reload()
    }

    postsLocalStorage.forEach((post) => {
        const contenedorPost = document.createElement("div");
        const elapsedTime = calculateElapsedTime(post.timestamp);
        let mediaContent = '';

        if (post.content.media && post.content.media.length > 0) {
            const media = post.content.media[0];
            if (media.type === "image") {
                mediaContent = `<img class="content" src="${media.url}" alt="media">`;
            } else if (media.type === "video") {
                mediaContent = `
                        <video class="content" controls>
                            <source src="${media.url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>`;
            }
        }



        contenedorPost.innerHTML = `
        <div class="tarjeta" id="postByUser-${post.id}">
            <div class="encabezado">
                <img class="foto" src="${post.user.profile_picture}" alt="${post.user.name}"> 
                <section>
                    <a href="../views/perfil.html" class="profileLink" id="usuario">${post.user.name}</a>
                    <p id="fecha">${elapsedTime}</p>
                </section>
            </div>
            <p class="text">${post.content.text}</p>
            <div class="content">
                <img id="media" class="media">${mediaContent}
            </div>
            <div class="interactions">
                <section class="icons">
                    <i class='bx bxs-heart'></i>
                    <i class='bx bxs-like '></i>
                    <i class='bx bxs-donate-heart'></i>
                </section>
                <hr>
                <div class="post-actions">
                    <section class="Like">
                        <i class='bx bx-like'></i>
                        <p>Me Gusta</p>
                    </section>
                    <section class="openComments" id='${post.id}post'>
                        <i class='bx bx-comment'></i>
                        <p>Comentarios</p>
                    </section>
                    <section class="Share">
                        <i class='bx bx-share-alt'></i>
                        <p>Compartir</p>
                    </section>
                </div> 
            </div>    
        </div>`;


        publicaciones?.appendChild(contenedorPost);

        setTimeout(() => {
            const arrayPostsUsers = Array.from(postsUsers)
            arrayPostsUsers.find(user => {
                user.addEventListener("click", (e) => {
                    if (e.target.textContent.includes("Comentarios") && parseInt(user.id.split('-')[1]) == post.id) {
                        commentsByPost(post)
                        containerComment.classList.toggle("hiddenComment")
                    }
                })
            })
        }, 1000);


    });
    friendsList(posts, listaAmigos)
}



function friendsList(posts, containerFriends) {
    posts.forEach(amigo => {

        const contenedorAmigos = document.createElement("div");
        contenedorAmigos.innerHTML = `
        <div class="amigo">
            <img src="${amigo.user.profile_picture}" alt="${amigo.user.name}">
            <p>${amigo.user.name}</p>
        </div>`
        containerFriends?.appendChild(contenedorAmigos);
    })

}

dataJSON();

function calculateElapsedTime(timestamp) {
    const initialDate = new Date(timestamp);
    const currentDate = new Date();
    const elapsedMilliseconds = currentDate - initialDate;

    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let elapsedTimeString = '';
    if (years > 0) {
        elapsedTimeString = `${years}a`;
    } else if (months > 0) {
        elapsedTimeString = `${months}m`;
    } else if (days > 0) {
        elapsedTimeString = `${days}d`;
    } else if (hours > 0) {
        elapsedTimeString = `${hours}h`;
    } else if (minutes > 0) {
        elapsedTimeString = `${minutes}min`;
    } else {
        elapsedTimeString = 'Now';
    }

    return elapsedTimeString;
}

export default friendsList