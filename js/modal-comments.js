const containerComment = document.querySelector(".containerComment")
const commentModal = document.querySelector(".commentModal")
const closeComments = document.querySelector(".closeComment")
const openComments = document.querySelector(".openComments")
const postsUsers = document.getElementsByClassName("tarjeta")

export function commentsByPost(postData) {

    commentModal.innerHTML = `
        <div class="comments-section">
            <div class="comments-list">
            ${postData.comments.map(comment => `
                <div class="comment">
                    <p><strong>${comment.user.name}</strong></p>
                    <p>${comment.text}</p>
                </div>
                `)}
            </div>
            <div class="new-comment">
                <input type="text" placeholder="¿Qué estás pensando?">
                    <button>Send</button>
            </div>
        </div>
        `

    closeComments.addEventListener('click', () => {
        containerComment.classList.add("hiddenComment")
    })
}

