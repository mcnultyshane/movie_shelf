function login(){
    console.log('click');
    document.location.replace('/login')
}

function signUp(){
    document.location.replace('/signup')
}


const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active')
})