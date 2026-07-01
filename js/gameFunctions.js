import { countriesList } from "./countries.js";
import { getRandomInt, shuffle } from "./utils.js";

export function useCountries(list = countriesList) {
  let remainingCountriesList;
  let currentContinent;
  let currentOptions = [];
  let currentSolution = null;
  resetRemainingCountries();

  function getCountryOptions() {
    if (Object.keys(remainingCountriesList).length === 0) {
      return [];
    }

    currentOptions = [];
    const continents = Object.keys(remainingCountriesList);
    // add country from remaining countries
    addToOptions(remainingCountriesList, true);

    // other countries are added from the complete list
    while (currentOptions.length < 3) {
      addToOptions(countriesList);
    }

    currentOptions = shuffle(currentOptions);
    return currentOptions;
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

  function setSolutionIndex(countryOptions) {
    if (!currentSolution) {
      return -1;
    }

    return countryOptions.findIndex((option) => {
      return option.country.name === currentSolution.country.name;
    });
  }

  function resetRemainingCountries() {
    return (remainingCountriesList = { ...list });
  }

  function addToOptions(countriesList, isSolution = false) {
    const continents = Object.keys(countriesList);
    currentContinent = continents[getRandomInt(continents.length)];

    const randomCountry =
      countriesList[currentContinent][
        getRandomInt(countriesList[currentContinent].length)
      ];

    if (currentOptions.some((c) => c.country.name === randomCountry.name)) {
      return;
    }

    const option = {
      continent: currentContinent,
      country: randomCountry,
    };

    currentOptions.push(option);

    if (isSolution) {
      currentSolution = option;
    }
  }

  return {
    getCountryOptions,
    updateRemainingCountries,
    resetRemainingCountries,
    setSolutionIndex,
  };
}
