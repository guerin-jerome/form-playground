import { FormProvider, useForm } from "react-hook-form";
import { Layer1 } from "../../views/layers/Layer1";
import { Layer2 } from "../../views/layers/Layer2";
import { Layer3 } from "../../views/layers/Layer3";
import { useEffect, useState } from "react";
import {
  getSessionStorageFormValues,
  synchronizeLocalAndStorageData,
} from "../../persistence/sessionStorage";

export const StepForm = () => {
  const [formValid, setFormValid] = useState("Nope!");

  const methods = useForm({
    defaultValues: getSessionStorageFormValues("stepForm"),
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  const values = watch();

  useEffect(() => synchronizeLocalAndStorageData("stepForm", values), [values]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      setFormValid("Nope!");
    } else {
      setFormValid("Yay!");
    }
  }, [errors]);

  const onSubmit = (data) => {
    console.info("Submit form with data => ", data);
  };

  return (
    <>
      <h1>step form</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Layer1 /> <br />
          <Layer2 /> <br />
          <Layer3 /> <br />
          <input type="submit" />
        </form>
      </FormProvider>
      <div></div>
      {JSON.stringify(getValues())}
      <div>formulaire valide {formValid}</div>
    </>
  );
};
