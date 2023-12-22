import { useNavigate } from "react-router-dom";
import { Steps } from "../../tree";
import { Input } from "../atoms/Input";
import { useEffect, useMemo, useState } from "react";
import {
  getSessionStorageFormData,
  getSessionStorageFormValues,
  setSessionStorageFormData,
} from "../../persistence/sessionStorage";
import { FormProvider, useForm } from "react-hook-form";
import { processSynchronization } from "../../synchronize";

export const IdentityForm = () => {
  const formId = Steps.identity.name;
  // Cf. Règle 2/3 - README
  const invalidationRules = {
    firstname: ["name", "surname"],
    name: ["surname"],
  };

  const methods = useForm({
    // Cf. Règle 1 - README
    defaultValues: getSessionStorageFormValues(formId),
  });

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const subscription = processSynchronization({
      methods,
      formId,
      invalidationRules,
    });
    return () => subscription.unsubscribe();
  }, [formId, invalidationRules, methods]);

  const navigate = useNavigate();

  const { firstname, name, surname } = watch();

  const [isIdentityFirstPartValid, setValidityIdentityFirstPart] = useState(
    // Cf. Règle 1 - README
    getSessionStorageFormData(formId)?.isIdentityFirstPartValid
  );

  const canDisplayNextStepButton =
    !!surname &&
    isIdentityFirstPartValid &&
    Object.keys(errors || {}).length === 0;

  const handleSubmitIdentityForm = (data) => {
    console.debug("Submit identity form with data => ", data);
    navigate("/birth");
  };

  const handleClickValidateIdentityFirstPart = () => {
    if (!!firstname && !!name && Object.keys(errors || {}).length === 0) {
      setValidityIdentityFirstPart(true);
    }
  };

  useEffect(() => {
    if (!firstname || !name) {
      setValidityIdentityFirstPart(false);
    }
  }, [firstname, name]);

  // Cf. Règle 4 - README
  const data = useMemo(
    () => ({ isIdentityFirstPartValid }),
    [isIdentityFirstPartValid]
  );

  // Cf. Règle 4 - README
  useEffect(
    () => setSessionStorageFormData({ itemKey: formId, data }),
    [data, formId]
  );

  return (
    <>
      <h1>Informations d&apos;identité</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitIdentityForm)}>
          <Input
            label="Prénom :"
            name="firstname"
            type="text"
            options={{ required: true }}
          />
          <Input
            label="Nom :"
            name="name"
            type="text"
            options={{ required: true }}
          />
          <button
            style={{ marginBottom: "10px" }}
            type="button"
            disabled={!firstname || !name}
            onClick={handleClickValidateIdentityFirstPart}
          >
            Valider
          </button>
          <br />
          {/* Cf. Règle 5 - README */}
          {isIdentityFirstPartValid && (
            <Input
              label="Surnom :"
              name="surname"
              type="text"
              options={{ required: true, shouldUnregister: true }}
            />
          )}
          {canDisplayNextStepButton && <button type="submit">Soumettre</button>}
        </form>
      </FormProvider>
    </>
  );
};
