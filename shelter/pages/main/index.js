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

const SLIDER = function () {
  const dataList = [
    {
      "name": "Jennifer",
      "img": "./../../assets/images/pets-jennifer.svg",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "./../../assets/images/pets-sophia.svg",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "./../../assets/images/pets-woody.svg",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "./../../assets/images/pets-scarlet.svg",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "./../../assets/images/pets-katrine.svg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "./../../assets/images/pets-timmy.svg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "./../../assets/images/pets-freddie.svg",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "./../../assets/images/pets-charly.svg",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ]
  let dataListWork = [];
  
  let items = document.querySelectorAll(".carousel-item");
  let currentItem = 0;
  let emptyItem = 0;
  let isEnabled = true;

  function shuffle(dataList) {
      return dataListWork = dataList.sort(() => Math.random() - 0.5);
  };

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  }

  function changeEmptyItem(n) {
    emptyItem = (n + items.length) % items.length;
  }

  function fillNextList(n) {
    shuffle(dataList);
    const nextList = items[n];
    console.log(dataListWork)
    if (nextList.innerHTML == "") {
      const ul = document.createElement("ul");
      ul.classList.add("carousel-list")
      dataListWork.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("carousel__card")
        li.innerHTML = `
          <div class="card-wrapper">
            <div class="card-img">
              <img class="card-img__image" src="${item.img}" alt="card" />
            </div>
            <div class="card__title">${item.name}</div>
            <button class="card-btn">Learn more</button>
          </div>
        `;
        ul.append(li);
      })
      nextList.append(ul);
    }
  }

  function cleanList(n) {
    items[n].innerHTML = "";
  }

  function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    // console.log(items[currentItem])
    items[currentItem].addEventListener("animationend", function() {
      this.classList.remove("active", direction);
    })
  }

  function showItem(direction) {
    items[currentItem].classList.add("next", direction);
    // console.log(items[currentItem])
    items[currentItem].addEventListener("animationend", function() {
      this.classList.remove("next", direction);
      this.classList.add("active");
      isEnabled = true;
    })
  }

  function previousItem(n) {
    hideItem("to-right");
    changeCurrentItem(n - 1);
    changeEmptyItem(n - 2);
    fillNextList(currentItem);
    cleanList(emptyItem);
    showItem("from-left");
  }

  function nextItem(n) {
    hideItem("to-left");
    changeCurrentItem(n + 1);
    changeEmptyItem(n + 2);
    fillNextList(currentItem);
    cleanList(emptyItem);
    showItem("from-right");
  }

  document.querySelector(".btn-arrow-left").addEventListener("click", function() {
    if (isEnabled) {
      previousItem(currentItem);
    }
  });

  document.querySelector(".btn-arrow-right").addEventListener("click", function() {
    if (isEnabled) {
      nextItem(currentItem);
    }
  });
}

window.addEventListener("load", () => {
  burgerMenu();
  SLIDER();
});
