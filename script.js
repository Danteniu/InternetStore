const menuActive = document.querySelector('.menu'); // Находим меню
const burger = document.querySelector('.head_buttons'); // Находим кнопку бургера

function toggleMenu() {
menuActive.classList.toggle("hiddens"); //Ф-ция уделяет или устанавливает клесс с названием "hidden"
// div с классом •menu-active
}

burger.addEventListener('click', toggleMenu); // По клику на бургер, срабатывает ф-ция
