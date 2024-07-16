import friendsList from "./consumo-publicaciones.js"

const amigos = document.querySelector(".friendsList")

async function dataJSONFriends() {
    const response = await fetch("../js/utils/db-publicaciones.json");
    const { posts } = await response.json();
    const listFriends = friendsList(posts, amigos)
}
dataJSONFriends()

const modalFriends = document.getElementById("modal-friends")
const btnFriends = document.getElementById("friends")
const closeFriends = document.getElementById("close-friends")
const btnFriendsDesk = document.getElementById("btn-friends-desk")

btnFriendsDesk?.addEventListener("click", () => {
    modalFriends.classList.toggle("hidden-friends")
})

btnFriends.addEventListener("click", () => {
    modalFriends.classList.toggle("hidden-friends")
})

closeFriends.addEventListener("click", () => {
    modalFriends.classList.add("hidden-friends")
})
