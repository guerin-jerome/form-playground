/**
 * Synchronize useForm data with session storage
 * @param {String} id
 * @param {Object} data
 */
export const synchronizeLocalFormData = (id, data) => {
  const stringifyData = JSON.stringify(data);
  if (stringifyData !== JSON.stringify(sessionStorage.getItem(id))) {
    sessionStorage.setItem(id, stringifyData);
  }
};
