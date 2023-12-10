let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');

let loginFormBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let loginBtnSignup = document.querySelector('#login-btn-signup');
let loginFormClose = document.querySelector('#login-form-close');

let signupFormBtn = document.querySelector('#signup-btn');
let signupForm = document.querySelector('.signup-form-container');
let signupBtn = document.querySelector('#signup-btn');
let signupFormClose = document.querySelector('#signup-form-close');

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

loginBtnSignup.addEventListener('click', () => {
    signupForm.classList.remove('active'); // Close the signup form if open
    loginForm.classList.toggle('active'); // Toggle visibility of login form
});

signupBtn.addEventListener('click', () => {
    loginForm.classList.remove('active'); // Close the login form if open
    signupForm.classList.toggle('active'); // Toggle visibility of signup form
});


window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});


loginFormBtn.addEventListener('click', () => {
    loginForm.classList.add('active');
});

loginFormClose.addEventListener('click', () => {
    loginForm.classList.remove('active');
});

signupFormBtn.addEventListener('click', () => {
    signupForm.classList.add('active');
});

signupFormClose.addEventListener('click', () => {
    signupForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;

    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

