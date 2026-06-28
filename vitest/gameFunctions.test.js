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

    it("removes a continent with no countries in it", () => {
      const minimalList = {
        europe: [{ name: "Germany", flag: "🇩🇪" }],
        america: [
          { name: "Canada", flag: "🇨🇦" },
          { name: "Mexico", flag: "🇲🇽" },
        ],
      };

      const countries = useCountries(minimalList);
      remainingCountriesList = countries.resetRemainingCountries();
      countries.getCountryOptions();
      countries.updateRemainingCountries(solution);

      expect(Object.keys(remainingCountriesList).length).toBe(1);
      expect(Object.keys(remainingCountriesList)).not.toContain("europe");
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

  describe("resetRemainingCountries", () => {
    let countries;
    beforeEach(() => {
      countries = useCountries();
    });

    it("resets the remainingCountries to the full list", () => {
      expect(countries.resetRemainingCountries()).toEqual(countriesList);
    });
  });

  describe("getCountryOptions", () => {
    let countries;
    beforeEach(() => {
      countries = useCountries();
    });

    it("returns an object with three countries", () => {
      const options = countries.getCountryOptions();

      expect(options.length).toBe(3);
      expect(options[0]).toMatchObject({
        continent: expect.any(String),
        country: {
          name: expect.any(String),
          flag: expect.any(String),
        },
      });
    });

    it("returns no duplicate options", () => {
      const options = countries.getCountryOptions();

      const countryNames = options.map((c) => c.country.name);
      expect(countryNames.length).toEqual(new Set(countryNames).size);
    });

    describe("when no countries remain", () => {
      beforeEach(() => {
        countries = useCountries({});
      });
      it("returns empty array", () => {
        const options = countries.getCountryOptions();

        expect(options).toEqual([]);
      });
    });
  });
});
