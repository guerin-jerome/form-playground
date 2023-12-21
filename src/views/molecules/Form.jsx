import { func, node, object, string } from "prop-types";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  getSessionStorageFormValues,
  synchronizeLocalAndStorageData,
} from "../../persistence/sessionStorage";

export const Form = ({ id, defaultValues, children, onSubmit, rules}) => {
  const methods = useForm({
    defaultValues: getSessionStorageFormValues(id) || defaultValues,
  });

  const {watch, handleSubmit, resetField} = methods

  useEffect(() => {
    const subscription = watch((value, { type, name }) => {

      if(type !== "change" && type) {
        console.error("nouveau type ", type)
      }

      console.log(type, "type Form")
      console.log(name, "name Form")   
      console.log(value, "value Form")
  
      if(rules[name]) rules[name].forEach(element => {
        console.log(element, "element")
        resetField(element)
      });
    
      synchronizeLocalAndStorageData(id, value);
    });
    return () => subscription.unsubscribe();
  }, [watch, id]);

  useEffect(() => {

  }, [rules])

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
  rules: object,
  onSubmit: func,
};

Form.defaultProps = {
  defaultValues: undefined,
  rules: undefined,
  onSubmit: () => {},
};
