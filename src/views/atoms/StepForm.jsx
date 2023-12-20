import { func, node, object, string } from "prop-types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  getSessionStorageFormValues,
  synchronizeLocalAndStorageData,
} from "../../persistence/sessionStorage";

export const StepForm = ({ id, defaultValues, children, onSubmit }) => {
  const methods = useForm({
    defaultValues: getSessionStorageFormValues(id) || defaultValues,
  });

  const values = methods.watch();

  // Cf. Règle 1 - README
  useEffect(() => synchronizeLocalAndStorageData(id, values), [id, values]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

StepForm.propTypes = {
  id: string.isRequired,
  children: node.isRequired,
  defaultValues: object,
  onSubmit: func,
};

StepForm.defaultProps = {
  defaultValues: undefined,
  onSubmit: () => {},
};
