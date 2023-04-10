const BODY = document.querySelector(".shelter").parentElement;
const BURGER_BTN = document.querySelector(".burger-menu-button");
const BURGER_MENU = document.querySelector("#burger");
const BURGER_MENU_ITEMS = document.querySelectorAll(".burger-nav-item");
const OVERLAY = document.querySelector(".overlay");
const PAGINATION = document.querySelector(".control-btn-center");
const PAGE_BTN_DBL_LEFT = document.querySelector(".control-btn-db-left");
const PAGE_BTN_LEFT = document.querySelector(".control-btn-left");
const PAGE_BTN_RIGHT = document.querySelector(".control-btn-right");
const PAGE_BTN_DBL_RIGHT = document.querySelector(".control-btn-db-right");

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

const SLIDER = async function () {
  let response = await fetch('./../../assets/pets.json');
  let data = await response.json();
  // const data = ['1', '2', '3', '4', '5', '6', '7', '8'];
  

  let carouselWrapper = document.querySelector(".carousel-wrapper"),
      currentItem = 0,
      emptyItem = 0,
      isEnabled = true;

  let dataCopy = [],
      arrDataList = [];

  let page = 1,
      countPages = 0,
      countItemsOnPage = 0,
      allCountItemsPets = 0;

  function shuffle() {
    return dataCopy = [...data.sort(() => Math.random() - 0.5)];
  };

  function settingsWindow() {
    switch (true) {
      case window.innerWidth >= 1280:
        countPages = 6;
        countItemsOnPage = allCountItemsPets / countPages;
        checkStatusPage(countPages);
      break;
      case window.innerWidth >= 768 && window.innerWidth < 1280:
        countPages = 8;
        countItemsOnPage = allCountItemsPets / countPages;
        checkStatusPage(countPages);
      break;
      case window.innerWidth >= 320 && window.innerWidth < 768:
        countPages = 16;
        countItemsOnPage = allCountItemsPets / countPages;
        checkStatusPage(countPages);
      break;
    }
    for (let i = 0; i < countPages; i++) {
      arrDataList.push([...shuffle()]);
    }
    allCountItemsPets = [].concat(...arrDataList).length;
    containCarouselBlock();
  }
  settingsWindow();

  function containCarouselBlock() {
    if (carouselWrapper.innerHTML == "") {
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel-container");
      for (let i = 0; i < countPages; i++) {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if (i === 0) carouselItem.classList.add("active");
        const carouselList = document.createElement("ul");
        carouselList.classList.add("carousel-list");
        arrDataList[i].forEach(item => {
          const carouselCard = document.createElement("li");
          carouselCard.classList.add("carousel__card");
          carouselCard.innerHTML = `
            <div class="card-wrapper">
              <div class="card-img">
                <img class="card-img__image" src="${item.img}" alt="card" />
              </div>
              <div class="card__title">${item.name}</div>
              <button class="card-btn">Learn more</button>
            </div>
          `;
          carouselList.append(carouselCard);
        })
        carouselItem.append(carouselList);
        carouselContainer.append(carouselItem);
      }
      carouselWrapper.append(carouselContainer);
    }
  }

  let items = document.querySelectorAll(".carousel-item");

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  }

  function incrementPage() {
    page++;
    PAGINATION.innerHTML = page;
  }

  function DecrementPage() {
    page--;
    PAGINATION.innerHTML = page;
  }

  function checkStatusPage(x) {
    if (page !== 1 && page !== x) {
      PAGE_BTN_DBL_LEFT.removeAttribute("disabled");
      PAGE_BTN_LEFT.removeAttribute("disabled");
      PAGE_BTN_RIGHT.removeAttribute("disabled");
      PAGE_BTN_DBL_RIGHT.removeAttribute("disabled");
      PAGE_BTN_DBL_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
      PAGE_BTN_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
      PAGE_BTN_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
      PAGE_BTN_DBL_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
    }
    if (page === 1) {
      PAGE_BTN_DBL_LEFT.setAttribute("disabled", true);
      PAGE_BTN_LEFT.setAttribute("disabled", true);
      PAGE_BTN_DBL_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#CDCDCD";
      PAGE_BTN_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#CDCDCD";
    }
    if (page === x) {
      PAGE_BTN_DBL_RIGHT.setAttribute("disabled", true);
      PAGE_BTN_RIGHT.setAttribute("disabled", true);
      PAGE_BTN_DBL_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#CDCDCD";
      PAGE_BTN_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#CDCDCD";
    }
  }

  function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener("animationend", function() {
      this.classList.remove("active", direction);
    })
  }

  function showItem(direction) {
    items[currentItem].classList.add("next", direction);
    items[currentItem].addEventListener("animationend", function() {
      this.classList.remove("next", direction);
      this.classList.add("active");
      isEnabled = true;
    })
  }

  function previousItem(n) {
    hideItem("to-right");
    changeCurrentItem(n - 1);
    showItem("from-left");
    DecrementPage();
    settingsWindow();
  }

  function nextItem(n) {
    hideItem("to-left");
    changeCurrentItem(n + 1);
    showItem("from-right");
    incrementPage();
    settingsWindow();
  }

  document.querySelector(".control-btn-left").addEventListener("click", function() {
    if (isEnabled) {
      previousItem(currentItem);
    }
  });

  document.querySelector(".control-btn-right").addEventListener("click", function() {
    if (isEnabled) {
      nextItem(currentItem);
    }
  });
};

window.addEventListener("load", () => {
  burgerMenu();
  SLIDER();
});
