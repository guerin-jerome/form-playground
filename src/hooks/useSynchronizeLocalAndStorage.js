import { COURSE } from "../constants/course";
import { STORAGE_KEYS } from "../constants/persistence";
import { useCRUDPersistence } from "./useCRUDPersistence";

export const useSynchronizeLocalAndStorage = ({ pageId }) => {
  const { removeItem, getItem, setItem } = useCRUDPersistence({
    pageId,
  });

  const resetNextStepsFormValuesAndData = () => {
    const step = COURSE.find((page) => page.name === pageId)?.step;

    removeItem({ storageKey: STORAGE_KEYS.formData, itemKey: pageId });

    COURSE.forEach((page) => {
      if (page.name !== pageId && page.step > step) {
        removeItem({ storageKey: STORAGE_KEYS.formValues, itemKey: page.name });
        removeItem({ storageKey: STORAGE_KEYS.formData, itemKey: page.name });
      }
    });
  };

  const synchronize = (data) => {
    if (
      JSON.stringify(data) !==
      JSON.stringify(getItem({ storageKey: STORAGE_KEYS.formValues }))
    ) {
      setItem({ storageKey: STORAGE_KEYS.formValues, data });
      resetNextStepsFormValuesAndData();
    }
  };

  return { synchronize };
};
