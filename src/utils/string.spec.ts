import { cleanString } from "@/utils/string";

describe("cleanString helper function", () => {
  test("should return an empty string if a falsy input is provided", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(cleanString(null)).toBe("");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(cleanString(undefined)).toBe("");
    expect(cleanString("")).toBe("");
  });

  test("should convert all characters to lowercase", () => {
    expect(cleanString("THE ROLLING STONES")).toBe("the rolling stones");
    expect(cleanString("Hot Stuff")).toBe("hot stuff");
  });

  test("should strip out punctuation and special characters", () => {
    // Parentheses, hyphens, and symbols should be removed
    expect(cleanString("Hot Stuff (2025 Mix)")).toBe("hot stuff 2025 mix");
    expect(cleanString("Hot Stuff - 2025 Mix")).toBe("hot stuff 2025 mix");
    expect(cleanString("Let's Dance!")).toBe("lets dance");
  });

  test("should collapse multiple consecutive whitespaces into a single space", () => {
    expect(cleanString("Black    And    Blue")).toBe("black and blue");
    // Verifies that spaces left behind by removed punctuation are collapsed
    expect(cleanString("Artist - - - Title")).toBe("artist title");
  });

  test("should trim leading and trailing whitespaces", () => {
    expect(cleanString("   Seaside   ")).toBe("seaside");
    expect(cleanString(" - The Kooks - ")).toBe("the kooks");
  });

  test("should correctly process complex music metadata combinations", () => {
    const input1 = "The Rolling Stones";
    const input2 = "Hot Stuff - 2025 Mix";
    const input3 = "Black And Blue (Super Deluxe)";

    expect(cleanString(input1)).toBe("the rolling stones");
    expect(cleanString(input2)).toBe("hot stuff 2025 mix");
    expect(cleanString(input3)).toBe("black and blue super deluxe");
  });
});