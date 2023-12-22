import { useNavigate } from "react-router-dom";
import { Steps } from "../../tree";
import { Input } from "../atoms/Input";
import { FormProvider, useForm } from "react-hook-form";
import {
  getSessionStorageFormValues,
  synchronizeLocalAndStorageData,
} from "../../persistence/sessionStorage";
import { useEffect } from "react";

export const BirthForm = () => {
  const formId = Steps.birth.name;
  const invalidationRules = {
    birthdate: ["birthplace"],
  };

  const methods = useForm({
    defaultValues: getSessionStorageFormValues(formId),
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

        synchronizeLocalAndStorageData(formId, newValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [formId, invalidationRules, setValue, watch]);

  const navigate = useNavigate();

  const handleSubmitBirthForm = (data) => {
    console.debug("Submit birth form with data => ", data);
    navigate("/adress");
  };

  return (
    <>
      <h1>Informations de naissance</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitBirthForm)}>
          <Input
            label="Date de naissance :"
            name="birthdate"
            type="text"
            options={{ required: true }}
          />
          <Input
            label="Commune de naissance :"
            name="birthplace"
            type="text"
            options={{ required: true }}
          />
          <button type="submit">Soumettre</button>
        </form>
      </FormProvider>
    </>
  );
};
