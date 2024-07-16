export const modalValidaciones = (modal, textoError, infoError) => {
    modal.style.right = '0'
    infoError.textContent = textoError
    setTimeout(() => {
        modal.style.right = '-200%'
    }, 1000);
}