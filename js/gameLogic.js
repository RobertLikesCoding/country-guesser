import { countriesList } from "./countries.js";

const scoreDisplay = document.getElementById("score");
const flagElement = document.getElementById("flag");
const revealButton = document.getElementById("solution-btn");
const restartButton = document.getElementById("restart-btn");
const hintButton = document.getElementById("hint-btn");
const solutionText = document.getElementById("solution");
const hint = document.getElementById("hint");
let score = 0;
let randomCountry;
let continentForCountry;
revealButton.addEventListener("click", () => {
  revealSolution();
});
restartButton.addEventListener("click", () => {
  startNewRound();
});
hintButton.addEventListener("click", () => {
  revealHint();
});

export function startGame() {
  const startButton = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const scoreSection = document.getElementById("score-section");
  startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    scoreSection.classList.remove("hidden");
    scoreDisplay.textContent = score;
  });
}

export function initializeRound() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getCountryOptions() {
    // create an array of 3 countries, can be different continents
    // can't be the same twice!
    // one needs to be the correct one and two false ones
    // BETTER: just get three random countries and then pick a random one from those, that will be the correct one
    const countries = [];
    for (let step = 0; step < 3; step++) {
      const continent = Object.keys(countriesList)[getRandomInt(5)];
      const randomCountry =
        countriesList[continent][getRandomInt(continent.length)];
      countries.push(randomCountry);
    }
    return countries;
  }

  function revealSolution() {
    flagElement.classList.remove("fade-in");
    solutionText.textContent = randomCountry.name;
    revealButton.hidden = true;
    restartButton.hidden = false;
    hintButton.setAttribute("disabled", true);
    hintButton.classList.add("disabled");
  }

  function revealHint() {
    if (hint.textContent.includes("continent")) {
      const startLetters = randomCountry.name.substring(0, 2);
      solutionText.textContent = `${startLetters}...`;
    } else {
      hint.textContent = `continent: ${continentForCountry}`;
    }
  }

  return {
    getRandomInt,
    getCountryOptions,
    revealSolution,
    revealHint,
  };
}

function startNewRound() {
  setRandomCountry();

  solutionText.classList.remove("fade-in");
  solutionText.textContent = "";
  flagElement.classList.add("fade-in");
  flagElement.textContent = randomCountry.flag;
  hint.textContent = "";
  revealButton.hidden = false;
  restartButton.hidden = true;
  hintButton.removeAttribute("disabled");
  hintButton.classList.remove("disabled");
}
