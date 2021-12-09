"use strict";

const URLS = [
  "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
];
URLS.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
}

class Player {
  name;
  #hp;
  img;
  weapon = [];
  get hp() {
    return this.#hp;
  }
  attack(n) {
    console.log(`fight ${this.name} Fight... ${n ?? ""}`);
  }
  constructor({ name, img, hp = 100 }) {
    this.name = name;
    this.img = img;
    this.#hp = hp;
  }
}

const createPlayer = (p, name, hp) => {
  const url = URLS.sample();
  const player = new Player({ name, img: url, hp });
  return `<div class="${p}">
    <div class="progressbar">
        <div class="life" style="width:${player.hp}%"></div>
        <div class="name">${player.name}</div>
    </div>
    <div class="character">
        <img src="${player.img}" />
    </div>
  </div>
  `;
};

const player1 = createPlayer("player1", "SCORPION", 76);
const player2 = createPlayer("player2", "SUB-ZERO");

const arenas = document.querySelector("div.arenas");
arenas.innerHTML = player1 + player2;
