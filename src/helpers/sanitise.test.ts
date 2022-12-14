import { CustomApiErrorMessages } from "@constants/errors";
import { sanitiseData } from "./sanitise";
import { z } from "zod";

describe("Sanity test", () => {
  test("1 should equal 1", () => {
    expect(1).toBe(1);
  });
});

describe("sanitiseData helper for object", () => {
  const testSchema = z.object({
    artist: z.string().min(1),
    title: z.string().min(1),
  });
  test("Empty string for both artist and title should throw an error", () => {
    expect(() => {
      sanitiseData({ artist: "", title: "" }, testSchema);
    }).toThrowError(CustomApiErrorMessages.IncorrectInput);
  });
  test("Empty string for artist should throw an error", () => {
    expect(() => {
      sanitiseData({ artist: "", title: "Fragile" }, testSchema);
    }).toThrowError(CustomApiErrorMessages.IncorrectInput);
  });
  test("Empty string for title should throw an error", () => {
    expect(() => {
      sanitiseData({ artist: "Last Train", title: "" }, testSchema);
    }).toThrowError(CustomApiErrorMessages.IncorrectInput);
  });

  test("Input that has whitespace should be returned without", () => {
    expect(
      sanitiseData({ artist: "Last Train    ", title: "Fragile" }, testSchema)
    ).toHaveProperty("artist", "Last Train");
    expect(
      sanitiseData({ artist: "   Last Train", title: "Fragile" }, testSchema)
    ).toHaveProperty("artist", "Last Train");
    expect(
      sanitiseData({ artist: "Last Train", title: "    Fragile" }, testSchema)
    ).toHaveProperty("title", "Fragile");
    expect(
      sanitiseData(
        { artist: "   Last Train", title: "Fragile    " },
        testSchema
      )
    ).toHaveProperty("title", "Fragile");
  });

  test("Input that has too much whitespace should be returned without only one", () => {
    expect(
      sanitiseData({ artist: "Last  Train", title: "Fragile" }, testSchema)
    ).toHaveProperty("artist", "Last Train");
  });
});

describe("sanitiseData helper for string", () => {
  const testSchema = z.string().min(1);

  test("Empty string for link should throw an error", () => {
    expect(() => {
      sanitiseData("", testSchema);
    }).toThrowError(CustomApiErrorMessages.IncorrectInput);
  });

  test("Input that has whitespace should be returned without", () => {
    expect(sanitiseData("Last Train    ", testSchema)).toBe("Last Train");
    expect(sanitiseData("   Last Train", testSchema)).toBe("Last Train");
  });

  test("Input that has too much whitespace should be returned without only one", () => {
    expect(sanitiseData("Last  Train", testSchema)).toBe("Last Train");
  });
});
