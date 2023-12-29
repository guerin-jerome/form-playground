import { Steps } from "./course";

export const STORAGE_KEYS = {
  formValues: "form-values",
  formData: "form-data",
};

export const ITEM_KEYS = Object.keys(Steps).reduce(
  (accumulator, currentValue) => ({
    ...accumulator,
    [currentValue]: currentValue,
  }),
  {}
);
