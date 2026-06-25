import { countriesList } from "./countries.js";
import { getRandomInt } from "./utils.js";

export function useCountries(list = countriesList) {
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

      if (countries.some((c) => c.country.name === randomCountry.name)) {
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

  function resetRemainingCountries() {
    return (remainingCountriesList = { ...list });
  }

  return {
    getCountryOptions,
    updateRemainingCountries,
    resetRemainingCountries,
  };
}
