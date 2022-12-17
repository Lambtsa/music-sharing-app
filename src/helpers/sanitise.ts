import { CustomApiErrorMessages } from "@constants/errors";
import { z } from "zod";

/**
 * Small helper function to remove whitespace and trim
 * @example sanitiseData("LaSt    Train    ") // "last train"
 */
export const sanitiseData = <T extends string>(input: T): T => {
  const rmWhitespaceRegex = /\s\s+/g;
  return input.trim().replace(rmWhitespaceRegex, " ") as T;
};

/**
 * Will remove whitespace from data and check against schema passed in as second argument
 * @returns sanitised data
 */
export const isValidData = <T extends Record<string, string>>(
  input: T,
  schema: z.ZodSchema<T>
): T => {
  let newInput: T;

  newInput = input;
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      newInput[key] = sanitiseData(input[key] as string) as T[Extract<
        keyof T,
        string
      >];
    }
  }

  const isValid = schema.safeParse(newInput);
  if (!isValid.success) {
    throw new Error(CustomApiErrorMessages.IncorrectInput);
  }
  return newInput as T;
};
