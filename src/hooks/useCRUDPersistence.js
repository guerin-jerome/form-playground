import {
  getOnSessionStorage,
  removeOnSessionStorage,
  setOnSessionStorage,
} from "../persistence/sessionStorage";

/**
 * Choix technologie persistence actuelle : SessionStorage
 * Possibilité de changer de techno en changeant l'implémentation des 4 fonctions du hook.
 */

/**
 * Hook permettant un CRUD sur la couche persistence
 * Ce hook permet également un couplage faible avec la technologie de persistence.
 * @param {string} itemKey (contenu dans ITEM_KEYS constants/persistence.js)
 */
export const useCRUDPersistence = ({ pageId }) => {
  const getItem = ({ storageKey }) =>
    getOnSessionStorage({ storageKey, itemKey: pageId });

  const setItem = ({ storageKey, data }) =>
    setOnSessionStorage({ storageKey, itemKey: pageId, data });

  const removeItem = ({ storageKey, itemKey }) =>
    removeOnSessionStorage({ storageKey, itemKey });

  const updateItem = ({ storageKey, data }) => {
    const persistedData = getItem({ storageKey }) || {};
    const newData = {
      ...persistedData,
      ...data,
    };
    setItem({ storageKey, data: newData });
  };

  return { getItem, setItem, removeItem, updateItem };
};
