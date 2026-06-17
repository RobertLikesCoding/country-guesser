import { test, expect, describe } from "vitest";
import { getRandomInt } from "../js/utils";

describe("getRandomInt", () => {
  test("returns a random number", () => {
    const randNumber = getRandomInt(10);

    expect(typeof randNumber === "number").toBe(true);
  });
});
