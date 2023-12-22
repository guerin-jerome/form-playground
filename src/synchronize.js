import { synchronizeLocalAndStorageData } from "./persistence/sessionStorage";

export const processSynchronization = ({
  methods,
  formId,
  invalidationRules,
}) => {
  const subscription = methods.watch((value, { type, name }) => {
    if (type === "change") {
      const newValues = { ...value };

      // Cf. Règle 2/3 - README
      if (invalidationRules?.[name]) {
        invalidationRules[name].forEach((element) => {
          delete newValues[element];
          methods.setValue(element, undefined);
        });
      }

      // Cf. Règle 1 - README
      synchronizeLocalAndStorageData(formId, newValues);
    }
  });

  return subscription;
};
