import { it, expect, describe, beforeEach } from "vitest";
import { useCountries } from "../js/gameFunctions";
import { countriesList } from "../js/countries";

describe("useCountries", () => {
  describe("updateRemainingCountries", () => {
    let countries;
    let remainingCountriesList;
    const solution = {
      continent: "europe",
      country: {
        name: "Germany",
        flag: "🇩🇪",
      },
    };
    beforeEach(() => {
      countries = useCountries();
      remainingCountriesList = countries.resetRemainingCountries();
    });

    it("removes solution country from remaining countries", () => {
      const originalLength = remainingCountriesList[solution.continent].length;
      countries.getCountryOptions();
      countries.updateRemainingCountries(solution);

      expect(remainingCountriesList[solution.continent]).not.toContainEqual(
        solution.country,
      );
      expect(originalLength).not.toEqual(
        remainingCountriesList[solution.continent].length,
      );
    });
    it("does nothing if no current continent exists", () => {
      const originalLength = remainingCountriesList[solution.continent].length;
      countries.updateRemainingCountries(solution);

      expect(remainingCountriesList[solution.continent]).toContainEqual(
        solution.country,
      );
      expect(originalLength).toEqual(
        remainingCountriesList[solution.continent].length,
      );
    });
  });
});
