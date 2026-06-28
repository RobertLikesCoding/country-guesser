import { countriesList } from "./countries.js";
import { getRandomInt } from "./utils.js";

export function useCountries(list = countriesList) {
  let remainingCountriesList;
  let currentContinent;
  let currentOptions = [];
  resetRemainingCountries();

  function getCountryOptions() {
    if (Object.keys(remainingCountriesList).length === 0) {
      return [];
    }

    currentOptions = [];
    const continents = Object.keys(remainingCountriesList);
    // add country from remaining countries
    addToOptions(remainingCountriesList);

    // other countries are added from the complete list
    while (currentOptions.length < 3) {
      addToOptions(countriesList);
    }
    return shuffle(currentOptions);
  }

  function updateRemainingCountries(solution) {
    if (!currentContinent) return;

    const filteredCountries = remainingCountriesList[solution.continent].filter(
      (c) => {
        return c.name !== solution.country.name;
      },
    );

    remainingCountriesList[solution.continent] = filteredCountries;
    if (remainingCountriesList[solution.continent].length === 0) {
      // remove empty continents
      delete remainingCountriesList[solution.continent];
    }
  }

  function setSolutionIndex() {
    const resolvedRemainingCountries = Object.values(remainingCountriesList)
      .flat()
      .map((c) => c.name);

    return currentOptions.findIndex((c) => {
      return resolvedRemainingCountries.includes(c.country.name);
    });
  }

  function resetRemainingCountries() {
    return (remainingCountriesList = { ...list });
  }

  function addToOptions(countriesList) {
    const continents = Object.keys(countriesList);
    currentContinent = continents[getRandomInt(continents.length)];

    const randomCountry =
      countriesList[currentContinent][
        getRandomInt(countriesList[currentContinent].length)
      ];

    if (currentOptions.some((c) => c.country.name === randomCountry.name)) {
      return;
    } else {
      currentOptions.push({
        continent: currentContinent,
        country: randomCountry,
      });
    }
  }

  // credits: https://www.geeksforgeeks.org/javascript/how-to-shuffle-the-elements-of-an-array-in-javascript/
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return {
    getCountryOptions,
    updateRemainingCountries,
    resetRemainingCountries,
    setSolutionIndex,
  };
}
