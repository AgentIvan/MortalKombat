"use strict";


const rand = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

const URLS = {
  "scorpion": "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  "kitana": "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  "liukang": "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  "sonya": "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  "sub-zero": "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
};
URLS.sample = function () {
  const values = Object.values(this);
  const casual = rand(values.length - 1);
  return values[casual];
}

class Player {
  player;
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
  constructor({ player = 1, name, img = URLS.sample(), hp = 100 }) {
    this.name = name;
    let nameKey = name.toLowerCase(); //.replace(/[^\w]/gi, '');
    this.img = (nameKey in URLS) ? URLS[nameKey] : img;
    this.#hp = hp;
  }
}

const createPlayer = (p, player) => {
  console.log({ p, player });
  const pDiv = document.createElement('div');
  pDiv.className = p;
  pDiv.innerHTML = `
    <div class="progressbar">
      <div class="life" style="width:${player.hp}%"></div>
      <div class="name">${player.name}</div>
    </div>
    <div class="character">
      <img src="${player.img}" />
    </div>`
  return pDiv;
};

const init = () => {
  const player1 = new Player({ player: 1, name: "SCORPION", img: URLS.sample(), hp: 76 });
  const playerDiv1 = createPlayer("player1", player1);
  const player2 = new Player({ player: 2, name: "SUB-ZERO", img: URLS.sample() });
  const playerDiv2 = createPlayer("player2", player2);

  const $arenas = document.querySelector("div.arenas");
  $arenas.appendChild(playerDiv1);
  $arenas.appendChild(playerDiv2);
};

init();
