import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../components/atoms/Input";

const IDENTITY_FORMSTATE = {
  initial: "initial",
  needMoreInformations: "needMoreInformations",
  submissible: "submissible",
};

export const IdentityForm = () => {
  const {
    watch,
    trigger,
    register,
    formState: { errors },
  } = useFormContext();

  const { firstname, name, surname } = watch();

  const [identityFormState, setIdentityFormState] = useState(
    surname ? IDENTITY_FORMSTATE.submissible : IDENTITY_FORMSTATE.initial
  );

  const canDisplaySurnameInput = [
    IDENTITY_FORMSTATE.needMoreInformations,
    IDENTITY_FORMSTATE.submissible,
  ].includes(identityFormState);

  const canDisplayNextStepButton =
    identityFormState === IDENTITY_FORMSTATE.submissible &&
    Object.keys(errors || {}).length === 0;

  const handleClickValidateIdentityFirstPart = () =>
    trigger().then((isValid) =>
      setIdentityFormState(
        isValid
          ? IDENTITY_FORMSTATE.needMoreInformations
          : IDENTITY_FORMSTATE.initial
      )
    );

  useEffect(() => {
    setIdentityFormState(IDENTITY_FORMSTATE.initial);
  }, [firstname, name]);

  useEffect(() => {
    if (surname) {
      setIdentityFormState(IDENTITY_FORMSTATE.submissible);
    }
  }, [surname]);

  return (
    <>
      <Input
        label="Prénom :"
        type="text"
        errorMessage={errors?.firstname?.message}
        {...register("firstname", { required: "Ce champs est requis" })}
      />
      <Input
        label="Nom :"
        type="text"
        errorMessage={errors?.name?.message}
        {...register("name", { required: "Ce champs est requis" })}
      />
      <button
        style={{ marginBottom: "10px" }}
        type="button"
        onClick={handleClickValidateIdentityFirstPart}
      >
        Valider
      </button>
      <br />
      {canDisplaySurnameInput && (
        <Input
          label="Surnom :"
          type="text"
          errorMessage={errors?.surname?.message}
          {...register("surname", {
            required: "Ce champs est requis",
            shouldUnregister: true,
          })}
        />
      )}
      {canDisplayNextStepButton && <button type="submit">Soumettre</button>}
    </>
  );
};
