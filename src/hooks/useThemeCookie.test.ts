import { convertCookieValue } from "./useThemeCookie";

describe("convertCookieValue function", () => {
  test("should return true for 'true'", () => {
    expect(convertCookieValue("true")).toBe(true);
  });
  test("should return false for 'false'", () => {
    expect(convertCookieValue("false")).toBe(false);
  });
  test("should return false for ' '", () => {
    expect(convertCookieValue(" ")).toBe(false);
  });
  test("should return false for null", () => {
    expect(convertCookieValue(null)).toBe(false);
  });
});
