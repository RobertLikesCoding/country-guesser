import { startGame, initializeRound } from "./gameLogic.js";

startGame();

let randomCountry;
let continentForCountry;
let countryToGuessIndex;
const flagElement = document.getElementById("flag");
const revealButton = document.getElementById("solution-btn");
const restartButton = document.getElementById("restart-btn");
const hintButton = document.getElementById("hint-btn");
const solutionText = document.getElementById("solution");
const hint = document.getElementById("hint");
const countryChoices = document.getElementById("country-choices");
revealButton.addEventListener("click", () => {
  revealSolution();
});
restartButton.addEventListener("click", () => {
  startNewRound();
});
hintButton.addEventListener("click", () => {
  revealHint();
});

// cool, this is basically a vue composable!
const { getRandomInt, getCountryOptions, revealHint, revealSolution } =
  initializeRound();

initialization();

function initialization() {
  const options = getCountryOptions();
  countryToGuessIndex = getRandomInt(3);

  options.forEach((country, index) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    console.log(index);
    console.log(countryToGuessIndex);

    if ((index = countryToGuessIndex)) button.id = "solution-btn";
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
    increaseScore();
  } else {
    console.log("false");
  }
}

function startNewRound() {
  let countryToGuessIndex = getRandomInt(3);

  solutionText.classList.remove("fade-in");
  solutionText.textContent = "";
  flagElement.textContent = randomCountry.flag;
  hint.textContent = "";
  revealButton.hidden = false;
  restartButton.hidden = true;
  hintButton.removeAttribute("disabled");
  hintButton.classList.remove("disabled");
}
