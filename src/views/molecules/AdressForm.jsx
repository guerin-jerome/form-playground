import { Steps } from "../../tree";
import { Input } from "../atoms/Input";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import {
  getSessionStorageFormValues,
  synchronizeLocalAndStorageData,
} from "../../persistence/sessionStorage";
import { useEffect } from "react";

export const AdressForm = () => {
  const formId = Steps.adress.name;
  const invalidationRules = {
    adress: ["city"],
    zipcode: ["city"],
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

  const handleSubmitAdressForm = (data) => {
    console.debug("Submit adress form with data => ", data);
    navigate("/recapitulatif");
  };

  return (
    <>
      <h1>Informations d&apos;adresse</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitAdressForm)}>
          <Input
            label="Adresse :"
            name="adress"
            type="text"
            options={{ required: true }}
          />
          <Input
            label="Code postal :"
            name="zipcode"
            type="text"
            options={{ required: true }}
          />
          <Input
            label="Commune :"
            name="city"
            type="text"
            options={{ required: true }}
          />
          <button type="submit">Soumettre</button>
        </form>
      </FormProvider>
    </>
  );
};
