const BODY = document.querySelector(".shelter").parentElement;
const SHELTER = document.querySelector(".shelter");
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
  

  let sliderWrapper = document.querySelector(".slider-wrapper"),
      currentItem = 0,
      isEnabled = true;

  let arrDataList = [];

  let page = 1,
      countPages = 0,
      countItemsOnPage = 0,
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
  
    arr.forEach(() => {
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

  const fromDesktopToTablet = window.matchMedia('(max-width:1279px)');
  const fromTabletToDesktop = window.matchMedia('(min-width: 1280px)');
  const fromTabletToMobile = window.matchMedia('(max-width:767px)');
  const fromMobileToTablet = window.matchMedia('(min-width: 768px)');

  fromDesktopToTablet.addEventListener('change', (event) => {
    if (event.matches) {
      countItemsOnPage = 6;
      countPages = 8;
      // console.log(page, countPages, countItemsOnPage, currentItem)
      generatePetsData();
      checkStatusControlBtns(countPages);
      renderSliderBlock();
    }
  })

  fromTabletToDesktop.addEventListener('change', (event) => {
    if (event.matches) {
      countItemsOnPage = 8;
      countPages = 6;
      console.log(page, countPages)
      if (page > countPages) {
        page = countPages;
        PAGINATION.innerHTML = page;
      };
      // console.log(page, countPages, countItemsOnPage, currentItem)
      generatePetsData();
      checkStatusControlBtns(countPages);
      renderSliderBlock();
    }
  })

  fromTabletToMobile.addEventListener('change', (event) => {
    if (event.matches) {
      countItemsOnPage = 3;
      countPages = 16;
      // console.log(page, countPages, countItemsOnPage, currentItem)
      generatePetsData();
      checkStatusControlBtns(countPages);
      renderSliderBlock();
    }
  })

  fromMobileToTablet.addEventListener('change', (event) => {
    if (event.matches) {
      countItemsOnPage = 6;
      countPages = 8;
      if (page > countPages) {
        page = countPages;
        PAGINATION.innerHTML = page;
      };
      console.log(page)
      // console.log(page, countPages, countItemsOnPage, currentItem)
      generatePetsData();
      checkStatusControlBtns(countPages);
      renderSliderBlock();
    }
  })

  function reloadPage() {
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
    allCountItemsPets = arrDataList.length;
    countItemsOnPage = allCountItemsPets / countPages;
    if (sliderWrapper.innerHTML == "") {
      renderSliderBlock();
    }
  }
  reloadPage();

  function renderSliderBlock() {
    sliderWrapper.innerHTML = "";
    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container");
    for (let i = 0; i < countPages; i++) {
      const sliderItem = document.createElement("div");
      sliderItem.classList.add("slider-item");
      if (i === page - 1) sliderItem.classList.add("active");
      const sliderList = document.createElement("ul");
      sliderList.classList.add("slider-list");
      for (let i = 0; i < countItemsOnPage; i++) {
        const item = arrDataList.splice(0, 1);
        const sliderCard = document.createElement("li");
        sliderCard.classList.add("slider__card");
        sliderCard.setAttribute("data-name", item[0].name);
        sliderCard.innerHTML = `
          <div class="card-wrapper">
            <div class="card-img">
              <img class="card-img__image" src="${item[0].img}" alt="card" />
            </div>
            <div class="card__title">${item[0].name}</div>
            <button class="card-btn popup-btn">Learn more</button>
          </div>
        `;
        sliderCard.addEventListener("click", (e) => {
          console.log("popup")
          renderModalWindow(findPet(data, e.currentTarget.dataset.name));
        })
        sliderList.append(sliderCard);
      }
      sliderItem.append(sliderList);
      sliderContainer.append(sliderItem);
    }
    sliderWrapper.append(sliderContainer);
  }

  let items = document.querySelectorAll(".slider-item");

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
      if (PAGE_BTN_RIGHT.hasAttribute("disabled") && PAGE_BTN_DBL_RIGHT.hasAttribute("disabled")) {
        PAGE_BTN_RIGHT.removeAttribute("disabled");
        PAGE_BTN_DBL_RIGHT.removeAttribute("disabled");
        PAGE_BTN_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
        PAGE_BTN_DBL_RIGHT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
      }
    }
    if (page === countPages) {
      PAGE_BTN_DBL_LEFT.removeAttribute("disabled");
      PAGE_BTN_LEFT.removeAttribute("disabled");
      PAGE_BTN_DBL_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
      PAGE_BTN_LEFT.firstElementChild.firstElementChild.attributes.fill.value = "#292929";
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

  function resetSlider(n) {
    console.log(items[n-1])
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
    checkStatusControlBtns(countPages);
  }

  function nextItem(n) {
    hideItem("to-left");
    changeCurrentItem(n + 1);
    showItem("from-right");
    incrementPage();
    checkStatusControlBtns(countPages);
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
      resetSlider(1);
    }
  });

  document.querySelector(".control-btn-db-right").addEventListener("click", function() {
    if (isEnabled) {
      items[currentItem].classList.remove("active");
      changeCurrentItem(countPages - 1);
      resetSlider(countPages);
    }
  });

  // ============ *// POPUP //* ============== //

  const modalBlackOut = document.createElement("div");
  modalBlackOut.classList.add("blackout");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  SHELTER.append(modalBlackOut, modal);

  const addBlackout = () => {
    const blackout = document.querySelector('.blackout');
    blackout.classList.add('blackout-show');
  };
  const removeBlackout = () => {
    const blackout = document.querySelector('.blackout');
    blackout.classList.remove('blackout-show');
  };
  const addModalShow = () => {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal-show');
  };
  const removeModalShow = () => {
    const modal = getWrapper('.modal');
    modal.classList.remove('modal-show');
  };
  const addBodyVisible = () => {
    BODY.classList.remove('visible');
    BODY.classList.add('hidden');
  };
  const addBodyHidden = () => {
    BODY.classList.remove('hidden');
    BODY.classList.add('visible');
  };

  const getWrapper = (selector) => {
    const container = document.querySelector(selector);
    container && (container.innerHTML = '');
    return container;
  };
  
  // const addCardClickHandler = () => {
  //   const cards = document.querySelectorAll('.slider__card');
  
  //   for (const card of cards) {
  //     card.addEventListener('click', (e) => {
  //       renderModalWindow(findPet(data, card.dataset.name));
  //     });
  //   };
  // };
  
  const findPet = (data, name) => {
    return data.find(pet => pet.name === name);
  };

  function generateModal(petData) {
    let modalWrapper = document.createElement('div');
    modalWrapper.className = 'modal-wrapper';
    modalWrapper.innerHTML = `
      <img src="${petData.img}" alt="${petData.name}" class="modal__img">
      <div class="modal-content">
        <div class="title modal__title">${petData.name}</div>
        <div class="modal__subtitle">
        <span>${petData.type}</span> -
        <span>${petData.breed}</span>
      </div>
        <div class="modal__description">${petData.description}</div>
        <ul class="modal__list">
          <li class="modal__list-item"><span>Age: </span>${petData.age}</li>
          <li class="modal__list-item"><span>Inoculations: </span>${petData.inoculations}</li>
          <li class="modal__list-item"><span>Diseases: </span>${petData.diseases}</li>
          <li class="modal__list-item"><span>Parasites: </span>${petData.parasites}</li>
        </ul>
      </div>
      <button class="button button_round modal__button"></button>
    `;
    return modalWrapper;
  }

  const renderModalWindow = (petItemData) => {
    modal.append(generateModal(petItemData));
    addBlackout();
    addModalShow();
    addBodyVisible();
  
    const modalBtn = document.querySelector('.modal__button')
    modalBtn.addEventListener('click', () => {
      removeBlackout();
      removeModalShow();
      addBodyHidden();
    });
    const modalBlackout = document.querySelector(".blackout");
    modalBlackout.addEventListener('click', () => {
      removeBlackout();
      removeModalShow();
      addBodyHidden();
    });
  };

  // if (data) {
  //   addCardClickHandler();
  // };
};

window.addEventListener("load", () => {
  burgerMenu();
  SLIDER();
});
