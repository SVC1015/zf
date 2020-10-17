// Home Screen burger jawn
const burger = document.querySelector('.burger i');
const nav = document.querySelector('.nav');

// Defining a function
function toggleNav() {
    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-times');
    nav.classList.toggle('nav-active');
}

// add event listener to burgerrrr
burger.addEventListener('click', function() {
    toggleNav();
});