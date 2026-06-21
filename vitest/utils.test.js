import { it, expect, describe } from "vitest";
import { getRandomInt } from "../js/utils";

describe("getRandomInt", () => {
  it("returns a random number", () => {
    const randNumber = getRandomInt(10);

    expect(randNumber <= 10).toBe(true);
    expect(randNumber > 0).toBe(true);
  });
});
