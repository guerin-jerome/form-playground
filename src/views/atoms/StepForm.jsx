import { func, node, object, string } from "prop-types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  getSessionStorageFormValues,
  synchronizeLocalAndStorageData,
} from "../../persistence/sessionStorage";

export const StepForm = ({ id, defaultValues, children, onSubmit, rules }) => {
  const methods = useForm({
    defaultValues: getSessionStorageFormValues(id) || defaultValues,
  });

  const { watch, resetField, handleSubmit } = methods;

  useEffect(() => {
    const subscription = watch((value, { type, name }) => {
      if (type !== "change" && type) {
        console.error("nouveau type ", type);
      }

      const newValues = { ...value };

      if (rules?.[name]) {
        rules[name].forEach((element) => {
          delete newValues[element];
          resetField(element);
        });
      }

      synchronizeLocalAndStorageData(id, newValues);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

StepForm.propTypes = {
  id: string.isRequired,
  children: node.isRequired,
  defaultValues: object,
  onSubmit: func,
  rules: object,
};

StepForm.defaultProps = {
  defaultValues: undefined,
  onSubmit: () => {},
};
