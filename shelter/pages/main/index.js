// console.log('Оценка: 100 баллов\n\nТребования к вёрстке:\n\n1. Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n\n2. Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n\n3. Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n\n4. Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n\n5. Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n\nВёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n\n7. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n\n8. Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n\n9. При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\n\n10. Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8');
const BODY = document.querySelector(".shelter").parentElement;
const BURGER_BTN = document.querySelector(".burger-menu-button");
const BURGER_MENU = document.querySelector("#burger");
const BURGER_MENU_ITEMS = document.querySelectorAll(".burger-nav-item");
const OVERLAY = document.querySelector(".overlay");

const burgerMenu = function () {

  BURGER_BTN.addEventListener("click", () => {
    toggleMenu();
    BURGER_BTN.removeEventListener("click", toggleMenu);
  });
  OVERLAY.addEventListener("click", () => {
    toggleMenu();
    OVERLAY.removeEventListener("click", toggleMenu);
  });
  BURGER_MENU_ITEMS.forEach((item) => {
    item.addEventListener("click", () => {
      BURGER_MENU_ITEMS.forEach((i) => {
        i.classList.remove("burger-nav-item-active");
      })
      item.classList.add("burger-nav-item-active");
      toggleMenu();
      item.removeEventListener("click", toggleMenu);
    })
  })

  function toggleMenu() {
    BURGER_MENU.classList.toggle("burger-menu-active");
    if (BURGER_MENU.classList.contains("burger-menu-active")) {
      BODY.classList.add("hidden");
      BODY.classList.remove("visible");
    } else {
      BODY.classList.add("visible");
      BODY.classList.remove("hidden");
    }
  }
};

window.addEventListener("load", () => {
  burgerMenu();
});
