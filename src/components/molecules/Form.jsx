import { func, node, object, string } from "prop-types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCRUDPersistence } from "../../hooks/useCRUDPersistence";
import { STORAGE_KEYS } from "../../constants/persistence";
import { useSynchronizeLocalAndStorage } from "../../hooks/useSynchronizeLocalAndStorage";

export const Form = ({
  id,
  defaultValues,
  children,
  onSubmit,
  invalidationRules,
}) => {
  const { getItem } = useCRUDPersistence({ pageId: id });
  const { synchronize } = useSynchronizeLocalAndStorage({ pageId: id });

  const methods = useForm({
    defaultValues:
      getItem({ storageKey: STORAGE_KEYS.formValues }) || defaultValues,
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

        synchronize(newValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [id, invalidationRules, setValue, watch, synchronize]);

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
