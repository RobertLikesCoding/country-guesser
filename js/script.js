import { startGame, initializeRound } from "./gameLogic.js";

startGame();

let randomCountry;
let continentForCountry;
let countryToGuessIndex;
const flagElement = document.getElementById("flag");
const restartButton = document.getElementById("restart-btn");
const hintButton = document.getElementById("hint-btn");
const hint = document.getElementById("hint");
const countryChoices = document.getElementById("country-choices");
restartButton.addEventListener("click", () => {
  startNewRound();
});
hintButton.addEventListener("click", () => {
  revealHint();
});

// cool, this is basically a vue composable!
const {
  getRandomInt,
  getCountryOptions,
  revealHint,
  revealSolution,
  startNewRound,
} = initializeRound();

initialization();

function initialization() {
  const options = getCountryOptions();
  countryToGuessIndex = getRandomInt(3);

  options.forEach((country, index) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = country.name;
    button.addEventListener("click", (event) => {
      handleCountrySelection(event, options);
    });
    countryChoices.appendChild(button);
  });

  flagElement.textContent = options[countryToGuessIndex].flag;
}

function handleCountrySelection(event, options) {
  const selectedCountry = event.target.textContent;

  if (selectedCountry === options[countryToGuessIndex].name) {
    console.log("correct!");
    // increaseScore();
    // highlight correct answer
    // disable wrong answer
  } else {
    console.log("false");
    // start reset score to 0
    // show restart game button
  }
}
