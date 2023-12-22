import { COURSE } from "../tree";

const SESSION_STORAGE_KEYS = {
  formValues: "form-values",
  formData: "form-data",
};

const getOnSessionStorage = ({ storageKey, itemKey }) =>
  JSON.parse(sessionStorage.getItem(`${storageKey}.${itemKey}`));

const removeOnSessionStorage = ({ storageKey, itemKey }) =>
  sessionStorage.removeItem(`${storageKey}.${itemKey}`);

const setOnSessionStorage = ({ storageKey, itemKey, data }) =>
  sessionStorage.setItem(`${storageKey}.${itemKey}`, JSON.stringify(data));

export const getSessionStorageFormValues = (itemKey) =>
  getOnSessionStorage({
    storageKey: SESSION_STORAGE_KEYS.formValues,
    itemKey,
  });

export const getSessionStorageFormData = (itemKey) =>
  getOnSessionStorage({
    storageKey: SESSION_STORAGE_KEYS.formData,
    itemKey,
  });

const setSessionStorageFormValues = (pageId, data) =>
  setOnSessionStorage({
    storageKey: SESSION_STORAGE_KEYS.formValues,
    itemKey: pageId,
    data,
  });

export const setSessionStorageFormData = ({ itemKey, data }) => {
  const sessionStorageData =
    JSON.parse(
      sessionStorage.getItem(`${SESSION_STORAGE_KEYS.formData}.${itemKey}`)
    ) || {};
  const newData = {
    ...sessionStorageData,
    ...data,
  };
  setOnSessionStorage({
    storageKey: SESSION_STORAGE_KEYS.formData,
    itemKey,
    data: newData,
  });
};

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

export const synchronizeLocalAndStorageData = (pageId, data) => {
  if (
    JSON.stringify(data) !== JSON.stringify(getSessionStorageFormValues(pageId))
  ) {
    setSessionStorageFormValues(pageId, data);
    resetNextStepsFormValuesAndData(pageId);
  }
};
