"use strict";

const $arenas = document.querySelector("div.arenas");
const $randomButton = document.querySelector("button.button");

const rand = (max, min = 0) => Math.ceil(Math.random() * (max - min)) + min;

const URLS = {
  "scorpion": "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  "kitana": "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  "liu kang": "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  "sonya": "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  "sub-zero": "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
};
URLS.sample = function () {
  const values = Object.values(this);
  const casual = rand(values.length) - 1;
  return values[casual];
}

class Player {
  player;
  name;
  #hp;
  img;
  weapon = [];
  lastDamage = 0;
  get hp() {
    return this.#hp;
  }
  set hp(n) {
    const damage = rand(this.#hp - n);
    this.lastDamage = this.#hp > damage ? damage : this.#hp;
    this.attack(damage);
    this.#hp = this.#hp - this.lastDamage;
  }
  attack(n) {
    console.log(`${this.name} Fighted... ${n ?? ""}`);
  }
  constructor({ player = 1, name, img = URLS.sample(), hp = 100 }) {
    this.player = player;
    this.name = name;
    let nameKey = name.toLowerCase(); //.replace(/[^\w]/gi, '');
    this.img = (nameKey in URLS) ? URLS[nameKey] : img;
    this.#hp = hp;
  }
}

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

const createPlayer = (playerObj) => {
  // console.log({ player: playerObj });
  const $player = createElement('div', 'player' + playerObj.player);
  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = playerObj.hp + '%';
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;

  $progressbar.appendChild($name);
  $progressbar.appendChild($life);

  $character.appendChild($img);
  $player.appendChild($character);
  $player.appendChild($progressbar);

  return $player;
};

function changeHP(player) {
  const $life = document.querySelector(`.player${player.player} .life`);
  player.hp -= 20;
  $life.style.width = player.hp + '%';
  if (player.hp < 1) {
    fightResult(player);
    $randomButton.disabled = true;
    $randomButton.removeEventListener('click');
    console.log({ loose: player.name });
  }
};

function fightResult(player) {
  let $resultTitle = document.querySelector('div.loseTitle');
  if ($resultTitle) {
    $resultTitle.innerText = '';
  } else {
    $resultTitle = createElement('div', 'loseTitle');
    $resultTitle.innerText = player.name + ' loose';
    $arenas.appendChild($resultTitle);
  }
  return $resultTitle;
}

const init = () => {
  const player1 = new Player({ player: 1, name: "SCORPION", img: URLS.sample(), hp: 76 });
  const player2 = new Player({ player: 2, name: "SUB-ZERO", img: URLS.sample() });

  $randomButton.addEventListener('click', () => {
    changeHP(player1);
    changeHP(player2);
  });
  $arenas.appendChild(createPlayer(player1));
  $arenas.appendChild(createPlayer(player2));
};

init();
