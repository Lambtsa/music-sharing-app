import { CustomApiErrorMessages } from "@constants/errors";
import { z } from "zod";

/**
 * Will remove whitespace from data and check against schema passed in as second argument
 * @returns sanitised data
 */
export const sanitiseData = <T extends string | Record<string, any>>(
  input: T,
  schema: z.ZodSchema<T>
): T => {
  let newInput: T;
  const rmWhitespaceRegex = /\s\s+/g;

  /* Depending on the type of input we have to deal with the sanitising slightly differently */
  switch (typeof input) {
    case "string": {
      newInput = input.trim().replace(rmWhitespaceRegex, " ") as T;
      break;
    }
    case "object": {
      newInput = input;
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          newInput[key] = input[key].trim().replace(rmWhitespaceRegex, " ");
        }
      }
      break;
    }
    default: {
      /* Technically shouldn't happen because typescript would complain before */
      throw new TypeError("Not the right type for sanitiser");
    }
  }

  const isValid = schema.safeParse(newInput);
  if (!isValid.success) {
    throw new Error(CustomApiErrorMessages.IncorrectInput);
  }
  return newInput as T;
};
