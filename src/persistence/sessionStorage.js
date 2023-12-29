export const getOnSessionStorage = ({ storageKey, itemKey }) =>
  JSON.parse(sessionStorage.getItem(`${storageKey}.${itemKey}`));

export const setOnSessionStorage = ({ storageKey, itemKey, data }) =>
  sessionStorage.setItem(`${storageKey}.${itemKey}`, JSON.stringify(data));

export const removeOnSessionStorage = ({ storageKey, itemKey }) =>
  sessionStorage.removeItem(`${storageKey}.${itemKey}`);
