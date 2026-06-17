import { countriesList } from "./countries.js";
import { getRandomInt } from "./utils.js";

export function useCountries() {
  let remainingCountriesList;
  let currentContinent;
  resetRemainingCountries();

  function getCountryOptions() {
    const countries = [];

    while (countries.length < 3) {
      const continents = Object.keys(remainingCountriesList);
      currentContinent = continents[getRandomInt(continents.length)];

      const randomCountry =
        remainingCountriesList[currentContinent][
          getRandomInt(remainingCountriesList[currentContinent].length)
        ];

      if (countries.some((c) => c.country === randomCountry)) {
        continue;
      } else {
        countries.push({
          continent: currentContinent,
          country: randomCountry,
        });
      }
    }
    return countries;
  }

  function updateRemainingCountries(countryOptions, solutionIndex) {
    if (!countryOptions || !currentContinent) return;

    const solution = countryOptions[solutionIndex];
    console.log("before", remainingCountriesList, solution);

    const countryIndex = remainingCountriesList[solution.continent].findIndex(
      (c) => c === solution.country,
    );

    remainingCountriesList[solution.continent].splice(countryIndex, 1);
    console.log("after", remainingCountriesList);
  }

  function resetRemainingCountries() {
    remainingCountriesList = { ...countriesList };
  }

  return {
    getCountryOptions,
    updateRemainingCountries,
    resetRemainingCountries,
  };
}
