
const post = document.getElementById("post")


async function dataJSON() {

    const response = await fetch("../js/utils/db-publicaciones-pefil.json")
    const { posts } = await response.json()

    posts.forEach(singlePost => {

        const isMedia = singlePost.content.media
        const isLink = singlePost.content.link
        const isComment = singlePost.comments
        let mediaPost = null
        let commentPost = null

        if (isMedia.length !== 0) {
            isMedia.forEach(media => {
                mediaPost = media.url
            })
        }

        if (isComment.length !== 0) {
            isComment.map(comment => {
                commentPost = comment
            })
        }

        const containerPost = document.createElement("div")
        containerPost.classList.add("individualPost")
        containerPost.innerHTML = `
        <div class="user" >
            <img class="photo-profile-post" src="${singlePost.user.profile_picture}">
            <div class="name-timestamp">
                <p class="userNamePost">${singlePost.user.name}</p>
                <p class="timestamp"> ${singlePost.timestamp}</p>
            </div>
        </div>
        <div class="content">
            <p class="tex-post">${singlePost.content.text}</p>
            ${mediaPost === null
                ? "<div></div>"
                : ` <div class='media'> 
                        <img src = ${mediaPost} alt='imagen post user'>
                    </div>`
            // Hacer la logica para subir videos
            }
            
            ${isLink === null
                ? "<div></div>"
                : ` <div class="container-link-post">
                        <div class="container-link-post-img">
                            <img src= ${isLink.image} alt='imagen link'> 
                        </div>

                        <div class="container-link-description">
                            <h4> ${isLink.title} </h4>
                            <p class="description-link"> ${isLink.description}</p>
                            <p class="url-link">${isLink.url}</p>
                        </div>
                    </div>
                `
            }
            <div class="likes-shares">
                <div class="container-icon">${singlePost.likes}<i class='bx bxs-like' ></i></div>
                <div class="container-icon">${singlePost.shares}<i class='bx bxs-share-alt' ></i></div>
            </div>
            <div class="footer-post">
                <div class="btn-footer-post"><i class='bx bx-like icon-footer-post'></i> <span>Me gusta</span></div>
                <div class="btn-footer-post"><i class='bx bx-comment-detail icon-footer-post'></i> <span>Comentar</span></div>
                <div class="btn-footer-post"><i class='bx bx-share-alt icon-footer-post'></i> <span>Compartir</span></div>
            </div>
        </div>
        `
        post.appendChild(containerPost)
    });
}

dataJSON()
