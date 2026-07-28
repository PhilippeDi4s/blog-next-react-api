import slugify from "slugify";
import { generateRandomText } from "./generate-random-text";

export const generateSlubByText = (text: string) => {
  const slug = slugify(text, {
    lower: true,
    strict: true, 
    trim: true,
  });
  return `${slug}-${generateRandomText()}`
}
