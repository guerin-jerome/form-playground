import { func, node, object, string } from "prop-types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { synchronizeDataLocalWithPersistence } from "../../persistence/sessionStorage";

export const Form = ({ id, initialValues, children, onSubmit }) => {
  const methods = useForm({
    // Ici définir si source de vérité = local ou sessionStorage, possibilité d'écrase aussi {...initialValues, ...sessionStorage}
    defaultValues: initialValues || JSON.parse(sessionStorage.getItem(id)),
  });

  const values = methods.watch();

  useEffect(
    () => synchronizeDataLocalWithPersistence(id, values),
    [id, values]
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

Form.propTypes = {
  id: string.isRequired,
  children: node.isRequired,
  initialValues: object,
  onSubmit: func,
};

Form.defaultProps = {
  initialValues: undefined,
  onSubmit: () => {},
};
