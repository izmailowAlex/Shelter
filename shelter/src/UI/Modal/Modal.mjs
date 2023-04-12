export default class Modal {
  constructor(classes) {
    this.modal = "";
  }

  generateModal(petData) {
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <img src="${petData.img}" alt="${petData.name}" class="modal__img">
      <div class="modal__content">
        <div class="title modal__title">${petData.name}</div>
        <div class="modal__subtitle">
        <span>${petData.type}</span> -
        <span>${petData.breed}</span>
      </div>
        <div class="modal__desc">${petData.description}</div>
        <ul class="modal__list">
          <li class="modal__list-item"><span>Age: </span>${petData.age}</li>
          <li class="modal__list-item"><span>Inoculations: </span>${petData.inoculations}</li>
          <li class="modal__list-item"><span>Diseases: </span>${petData.diseases}</li>
          <li class="modal__list-item"><span>Parasites: </span>${petData.parasites}</li>
        </ul>
      </div>
      <button class="button button_round modal__button"></button>`;
    return modal;
  }
}
