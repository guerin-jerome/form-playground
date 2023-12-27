import { func, node, object, string } from "prop-types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  getSessionStorageFormValues,
  synchronizeLocalAndStorageData,
} from "../../persistence/sessionStorage";

export const Form = ({
  id,
  defaultValues,
  children,
  onSubmit,
  invalidationRules,
}) => {
  const methods = useForm({
    defaultValues: getSessionStorageFormValues(id) || defaultValues,
  });

  const { watch, setValue, handleSubmit } = methods;

  useEffect(() => {
    const subscription = watch((value, { type, name }) => {
      if (type === "change") {
        const newValues = { ...value };

        if (invalidationRules?.[name]) {
          invalidationRules[name].forEach((element) => {
            delete newValues[element];
            setValue(element, undefined);
          });
        }

        synchronizeLocalAndStorageData(id, newValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [id, invalidationRules, setValue, watch]);

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
  invalidationRules: object,
};

Form.defaultProps = {
  defaultValues: undefined,
  onSubmit: () => {},
};
