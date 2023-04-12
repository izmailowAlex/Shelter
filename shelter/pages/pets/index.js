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
  

  let carouselWrapper = document.querySelector(".carousel-wrapper"),
      currentItem = 0,
      emptyItem = 0,
      isEnabled = true;

  let dataCopy = [],
      arrDataList = [];

  let page = 1,
      countPages = 0,
      countItemsOnPage = 0,
      width = true,
      allCountItemsPets = 0;

  // ============ RANDOM ============== //

  const generateSeed = () => {
    let result = [];
  
    for (let i = 0; i < 8; i++) {
      const generateRandomNumber = () => {
        let number = Math.floor(Math.random() * 8);
        if (result.includes(number)) {
          generateRandomNumber();
        } else {
          result.push(number);
        }
      };
      generateRandomNumber();
    };
  
    return result;
  };

  const shuffleArr = (arr) => {
    let result = [];
  
    arr.forEach((e) => {
      const generateRandomNumber = () => {
        let number = Math.floor(Math.random() * 8);
        if (!result.includes(number) && arr.includes(number)) {
          result.push(number);
        } else {
          generateRandomNumber();
        }
      };
      generateRandomNumber();
    });
  
    return result;
  };

  const generateRandomArr = (seed) => {
    let resultArr = [];
  
    resultArr.push([seed[0], seed[1], seed[2]]);
    resultArr.push([seed[3], seed[4], seed[5]]);
    resultArr.push([seed[6], seed[7]]);
    resultArr[0] = shuffleArr(resultArr[0]);
    resultArr[1] = shuffleArr(resultArr[1]);
    resultArr[2] = shuffleArr(resultArr[2]);
    resultArr = resultArr.flat(3);
    return resultArr;
  };

  const generatePetsData = () => {
    const seed = generateSeed();
    let petsData = [];
    let dataInterfacePaginationRandomArr = [];
    for (let i = 0; i < 6; i++) {
      dataInterfacePaginationRandomArr.push(generateRandomArr(seed))
      dataInterfacePaginationRandomArr = dataInterfacePaginationRandomArr.flat(3)
    };
    dataInterfacePaginationRandomArr.forEach(e => {
      petsData.push(data[e]);
    });
    arrDataList = petsData;
    return arrDataList;
  };

  // ============ *// RANDOM //* ============== //

  const fromDesktopToMobile = window.matchMedia('(max-width:767px)');
  fromDesktopToMobile.addEventListener('change', (event) => {
    if (event.matches) {
      width = false;
      countItemsOnPage = 3;
      countPages = 16;
      console.log(countItemsOnPage, countPages, page)
      generatePetsData();
      checkStatusControlBtns(countPages);
      if (width === false) {
        containCarouselBlock();
      };
    }
  })

  const fromDesktopToTablet = window.matchMedia('(min-width: 768px) and (max-width:1279px)');
  fromDesktopToTablet.addEventListener('change', (event) => {
    if (event.matches) {
      width = false;
      countItemsOnPage = 6;
      countPages = 8;
      console.log(countItemsOnPage, countPages, page)
      generatePetsData();
      checkStatusControlBtns(countPages);
      if (width === false) {
        containCarouselBlock();
      };
    }
  })

  const fromDesktopToDesktop = window.matchMedia('(min-width:1280px)');
  fromDesktopToDesktop.addEventListener('change', (event) => {
    if (event.matches) {
      width = false;
      countItemsOnPage = 8;
      countPages = 6;
      console.log(countItemsOnPage, countPages, page)
      generatePetsData();
      checkStatusControlBtns(countPages);
      if (width === false) {
        containCarouselBlock();
      };
    }
  })

  function checkSizeWindow() {
    if (innerWidth >= 1280) {
      countPages = 6;
    }
    if (innerWidth >= 768 && innerWidth < 1280) {
      countPages = 8;
    }
    if (innerWidth >= 320 && innerWidth < 768) {
      countPages = 16;
    }
    generatePetsData();
    // containArrDataList();
    checkStatusControlBtns(countPages);
    // console.log(countPages, countItemsOnPage, allCountItemsPets)
    if (width === false) {
      console.log("checkSizeWindow: ", width)
      // console.log(countItemsOnPage, width)
      containCarouselBlock();
    };
  }

  function settingsWindow() {
    switch (true) {
      case window.innerWidth >= 1280:
        countPages = 6;
      break;
      case window.innerWidth >= 768 && window.innerWidth < 1280:
        countPages = 8;
      break;
      case window.innerWidth >= 320 && window.innerWidth < 768:
        countPages = 16;
      break;
    }
    checkStatusControlBtns(countPages);
    generatePetsData();
    // containArrDataList();
    // console.log(arrDataList)
    allCountItemsPets = arrDataList.length;
    // allCountItemsPets = [].concat(...arrDataList).length;
    countItemsOnPage = allCountItemsPets / countPages;
    // console.log(countItemsOnPage)
    // checkSizeWindow();
    if (carouselWrapper.innerHTML == "") {
      containCarouselBlock();
    }
  }
  settingsWindow();

  // function containArrDataList() {
  //   arrDataList = [];
  //   for (let i = 0; i < countPages; i++) {
  //     arrDataList.push([...shuffle()]);
  //   }
  // }

  function containCarouselBlock() {
    carouselWrapper.innerHTML = "";
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container");
    for (let i = 0; i < countPages; i++) {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (i === page - 1) carouselItem.classList.add("active");
      const carouselList = document.createElement("ul");
      carouselList.classList.add("carousel-list");
      for (let i = 0; i < countItemsOnPage; i++) {
        const item = arrDataList.splice(0, 1)
        const carouselCard = document.createElement("li");
        carouselCard.classList.add("carousel__card");
        carouselCard.innerHTML = `
          <div class="card-wrapper">
            <div class="card-img">
              <img class="card-img__image" src="${item[0].img}" alt="card" />
            </div>
            <div class="card__title">${item[0].name}</div>
            <button class="card-btn popup-btn">Learn more</button>
          </div>
        `;
        carouselList.append(carouselCard);
      }
      carouselItem.append(carouselList);
      carouselContainer.append(carouselItem);
    }
    carouselWrapper.append(carouselContainer);
    width = true;
    console.log("containCarouselBlock: ", width)
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

  function checkStatusControlBtns(x) {
    if (page !== 1 && page !== x) {
      // console.log('WTF1')
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
      // console.log('WTF2')
      PAGE_BTN_DBL_LEFT.setAttribute("disabled", true);
      PAGE_BTN_LEFT.setAttribute("disabled", true);
      PAGE_BTN_DBL_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#CDCDCD";
      PAGE_BTN_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#CDCDCD";
      if (PAGE_BTN_RIGHT.hasAttribute("disabled") && PAGE_BTN_DBL_RIGHT.hasAttribute("disabled")) {
        PAGE_BTN_RIGHT.removeAttribute("disabled");
        PAGE_BTN_DBL_RIGHT.removeAttribute("disabled");
        PAGE_BTN_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
        PAGE_BTN_DBL_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
      }
    }
    if (page === countPages) {
      // console.log('WTF3')
      PAGE_BTN_DBL_LEFT.removeAttribute("disabled");
      PAGE_BTN_LEFT.removeAttribute("disabled");
      PAGE_BTN_DBL_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
      PAGE_BTN_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
      PAGE_BTN_DBL_RIGHT.setAttribute("disabled", true);
      PAGE_BTN_RIGHT.setAttribute("disabled", true);
      PAGE_BTN_DBL_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#CDCDCD";
      PAGE_BTN_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#CDCDCD";
    }
    if (page > x) {
      // console.log('WTF4')
      containCarouselBlock();
      page = x;
      PAGINATION.innerHTML = page;
    };
  }

  function hideItem(direction) {
    isEnabled = false;
    console.log(items[currentItem])
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

  function resetCarousel(n) {
    items[n-1].classList.add("active");
    page = n;
    PAGINATION.innerHTML = page;
    checkStatusControlBtns(page)
  }

  function previousItem(n) {
    hideItem("to-right");
    changeCurrentItem(n - 1);
    showItem("from-left");
    DecrementPage();
    settingsWindow();
  }

  function nextItem(n) {
    console.log("nextItem-start: ", isEnabled)
    hideItem("to-left");
    changeCurrentItem(n + 1);
    showItem("from-right");
    incrementPage();
    settingsWindow();
    console.log("nextItem-end: ", isEnabled)
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

  document.querySelector(".control-btn-db-left").addEventListener("click", function() {
    if (isEnabled) {
      items[currentItem].classList.remove("active");
      changeCurrentItem(0);
      resetCarousel(1);
    }
  });

  document.querySelector(".control-btn-db-right").addEventListener("click", function() {
    if (isEnabled) {
      items[currentItem].classList.remove("active");
      changeCurrentItem(countPages - 1);
      resetCarousel(countPages);
    }
  });

  // window.addEventListener(`resize`, () => {
  //   width = false;
  //   checkSizeWindow();
  // }, true);
};

const Popup = function () {
  const LEARN_MORE_BUTTONS = document.querySelectorAll(".popup-btn");
  // console.log(LEARN_MORE_BUTTONS)
}

window.addEventListener("load", () => {
  burgerMenu();
  SLIDER();
  Popup();
});
