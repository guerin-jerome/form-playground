import { func, node, object, string } from "prop-types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  getSessionStorageFormValues,
  synchronizeLocalAndStorageData,
} from "../../persistence/sessionStorage";

export const Form = ({ id, defaultValues, children, onSubmit, rules }) => {
  const methods = useForm({
    values: getSessionStorageFormValues(id) || defaultValues,
  });

  const { watch, setValue, handleSubmit } = methods;

  useEffect(() => {
    const subscription = watch((value, { type, name }) => {
      if (type === "change") {
        const newValues = { ...value };

        if (rules?.[name]) {
          rules[name].forEach((element) => {
            delete newValues[element];
            setValue(element, undefined);
          });
        }

        synchronizeLocalAndStorageData(id, newValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [id, rules, setValue, watch]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

Form.propTypes = {
  id: string.isRequired,
  children: node.isRequired,
  defaultValues: object,
  onSubmit: func,
  rules: object,
};

Form.defaultProps = {
  defaultValues: undefined,
  onSubmit: () => {},
};
