const burger = document.querySelector(".header_burger");
const menu = document.querySelector(".header_menu");
const signUpButtons = document.querySelectorAll(".sign-up_btn");
const modal = document.querySelector(".modal");


modal.addEventListener('click', (event) => {
    if (event._isClickWithInModal) return;
    modal.classList.remove('open');
})
modal.querySelector('.modal_window').addEventListener('click', event => {
    event._isClickWithInModal = true;
})
signUpButtons.forEach((signUpButton) => {
    signUpButton.addEventListener("click", () => {
        modal.classList.add("open");
    })
})

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
})


