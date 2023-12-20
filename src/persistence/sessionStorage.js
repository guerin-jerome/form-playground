import { COURSE } from "../tree";

const SESSION_STORAGE_KEYS = {
  formValues: "form-values",
};

const getOnSessionStorage = ({ storageKey, itemKey }) =>
  JSON.parse(sessionStorage.getItem(`${storageKey}.${itemKey}`));

const removeOnSessionStorage = ({ storageKey, itemKey }) =>
  sessionStorage.removeItem(`${storageKey}.${itemKey}`);

const setOnSessionStorage = ({ storageKey, itemKey, data }) => {
  const sessionStorageData =
    JSON.parse(sessionStorage.getItem(`${storageKey}.${itemKey}`)) || {};
  const newData = {
    ...sessionStorageData,
    ...data,
  };
  const stringifyData = JSON.stringify(newData);
  sessionStorage.setItem(`${storageKey}.${itemKey}`, stringifyData);
};

export const getSessionStorageFormValues = (itemKey) =>
  getOnSessionStorage({
    storageKey: SESSION_STORAGE_KEYS.formValues,
    itemKey,
  });

const setSessionStorageFormValues = (pageId, data) =>
  setOnSessionStorage({
    storageKey: SESSION_STORAGE_KEYS.formValues,
    itemKey: pageId,
    data,
  });

// Cf. Règle 2 - README
const resetNextStepsFormValuesAndData = (id) => {
  const step = COURSE.find((page) => page.name === id)?.step;

  COURSE.forEach((page) => {
    if (page.name !== id && page.step > step) {
      removeOnSessionStorage({
        storageKey: SESSION_STORAGE_KEYS.formValues,
        itemKey: page.name,
      });
    }
  });
};

// Cf. Règle 1 - README
export const synchronizeLocalAndStorageData = (pageId, data) => {
  if (
    JSON.stringify(data) !== JSON.stringify(getSessionStorageFormValues(pageId))
  ) {
    setSessionStorageFormValues(pageId, data);
  }
  resetNextStepsFormValuesAndData(pageId);
};
