import { COURSE } from "../tree";

const SESSION_STORAGE_KEYS = {
  formValues: "form-values",
  formData: "form-data",
};

const getOnSessionStorage = ({ storageKey, itemKey }) =>
  JSON.parse(sessionStorage.getItem(storageKey))?.[itemKey];

const setOnSessionStorage = ({ storageKey, itemKey, data }) => {
  const sessionStorageData = JSON.parse(sessionStorage.getItem(storageKey));
  const newData = {
    ...sessionStorageData,
    [itemKey]: data,
  };
  const stringifyData = JSON.stringify(newData);
  sessionStorage.setItem(storageKey, stringifyData);
};

export const getSessionStorageFormValues = (itemKey) =>
  getOnSessionStorage({
    storageKey: SESSION_STORAGE_KEYS.formValues,
    itemKey,
  });

// const getSessionStorageFormData = (itemKey) =>
//   getOnSessionStorage({
//     storageKey: SESSION_STORAGE_KEYS.formData,
//     itemKey,
//   });

const setSessionStorageFormValues = (itemKey, data) =>
  setOnSessionStorage({
    storageKey: SESSION_STORAGE_KEYS.formValues,
    itemKey,
    data,
  });

// const setSessionStorageFormData = (itemKey, data) =>
//   setOnSessionStorage({
//     storageKey: SESSION_STORAGE_KEYS.formData,
//     itemKey,
//     data,
//   });

const shouldUnregisterItem = (item, itemId, group) =>
  // L'id de l'élément soit différent de celui qui est impliqué dans le changement
  itemId !== item.itemId &&
  // L'élément se trouve après celui impliqué dans le changement
  item.itemId > itemId &&
  // Soit il ne fait pas partie d'un groupe s'il y en a et si pas de groupe on supprime
  ((group !== undefined && item.group !== group) || !group);

export const synchronizeLocalAndRemoteData = (id, data) => {
  if (
    JSON.stringify(data) !== JSON.stringify(getSessionStorageFormValues(id))
  ) {
    setSessionStorageFormValues(id, data);
  }
};

export const processInvalidation = ({ target, setValue }) => {
  // Warning : pas certain ici, la recherche sur le name, on pourrait le faire grâce à l'url du navigateur et le page.path
  const pageChanged = COURSE.find((page) =>
    page.items.some((item) => item.name === target.name)
  );
  const { step, items } = pageChanged || {};

  const itemChanged = items.find((item) => item.name === target.name);
  const { itemId, group } = itemChanged || {};

  // Prends les éléments des pages suivantes qui sont tous à supprimer
  const nextPageElements = COURSE.filter((page) => page.step > step).map(
    ({ id, step, items }) => ({ id, step, items })
  );
  // Récupère les éléments de la page actuelle et ne garde que ceux à supprimer
  const actualPageElementsToRemove = COURSE.filter((page) => page.step === step)
    .map(({ id, step, items }) => ({ id, step, items }))
    .map((element) => ({
      ...element,
      items: element.items.filter((item) =>
        shouldUnregisterItem(item, itemId, group)
      ),
    }));

  const elementsToRemove = [...nextPageElements, ...actualPageElementsToRemove];

  elementsToRemove.forEach((page) => {
    // On récupère les données persistées de la page
    const sessionStorageFormValues = getSessionStorageFormValues(page.id) || {};

    page.items.forEach((item) => {
      // On supprime des données persistées les éléments à enlever
      delete sessionStorageFormValues[item.name];
      // Si c'est la page actuelle on supprime les données dans le useForm également
      if (page.step === step) {
        setValue(item.name, undefined);
      }
    });

    // Si c'est la page actuelle on rajoute la donnée qui vient d'être modifier
    if (page.step === step) {
      sessionStorageFormValues[target.name] = target.value;
    }

    // On sauvegarde les nouvelles données après invalidation
    setSessionStorageFormValues(page.id, sessionStorageFormValues);
  });
};
