const BODY = document.querySelector(".shelter").parentElement;
const SHELTER = document.querySelector(".shelter");
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

const CAROUSEL = async function () {
  let response = await fetch('./../../assets/pets.json');
  let data = await response.json();
  

  let currentItem = 0,
      emptyItem = 0,
      isEnabled = true;

  let arrDataList = [];

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

  function renderCarouselBlock() {
    generatePetsData();
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    carouselWrapper.innerHTML = "";
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container");
    for (let i = 0; i < 3; i++) {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      const carouselList = document.createElement("ul");
      carouselList.classList.add("carousel-list");
      if (i === currentItem) {
        carouselItem.classList.add("active");
        for (let i = 0; i < 8; i++) {
          const item = arrDataList.splice(0, 1);
          const carouselCard = document.createElement("li");
          carouselCard.classList.add("carousel__card");
          carouselCard.setAttribute("data-name", item[0].name);
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
      };
      carouselContainer.append(carouselItem);
    };
    carouselWrapper.append(carouselContainer);
  }
  renderCarouselBlock();
  
  let items = document.querySelectorAll(".carousel-item");

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  }

  function changeEmptyItem(n) {
    emptyItem = (n + items.length) % items.length;
  }

  function fillNextList(n) {
    generatePetsData();
    const nextList = items[n];
    if (nextList.innerHTML == "") {
      const carouselList = document.createElement("ul");
      carouselList.classList.add("carousel-list")
      arrDataList.forEach((item) => {
        const carouselCard = document.createElement("li");
        carouselCard.classList.add("carousel__card");
        carouselCard.setAttribute("data-name", item.name);
        carouselCard.innerHTML = `
          <div class="card-wrapper">
            <div class="card-img">
              <img class="card-img__image" src="${item.img}" alt="card" />
            </div>
            <div class="card__title">${item.name}</div>
            <button class="card-btn">Learn more</button>
          </div>
        `;
        carouselCard.addEventListener("click", (e) => {
          renderModalWindow(findPet(data, e.currentTarget.dataset.name));
        })
        carouselList.append(carouselCard);
      })
      nextList.append(carouselList);
    }
  }

  function cleanList(n) {
    items[n].innerHTML = "";
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
  
  const addCardClickHandler = () => {
    const cards = document.querySelectorAll('.carousel__card');
  
    for (const card of cards) {
      card.addEventListener('click', (e) => {
        renderModalWindow(findPet(data, card.dataset.name));
      });
    };
  };
  
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

  if (data) {
    addCardClickHandler();
  };
}

window.addEventListener("load", () => {
  burgerMenu();
  CAROUSEL();
});
