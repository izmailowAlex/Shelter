export default class Card {
  constructor({
    name,
    img,
    type,
    breed,
    description,
    age,
    inoculations,
    diseases,
    parasites,
    ...rest
  }) {
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  generateCard() {
    let template = "";
    let card = document.createElement("article");
    card.className = "card";
    card.setAttribute("data-name", this.name);

    this.img &&
      this.name &&
      (template += `<img class="card__img" src=${this.img} alt=${this.name}>
      <div class="card__title">${this.name}</div>
      <button class="button card__button">Learn more</button>`);

    card.innerHTML = template;
    return card;
  }
}
