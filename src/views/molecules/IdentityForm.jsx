import { Input } from "../atoms/Input";
import { useEffect, useMemo, useState } from "react";
import {
  getSessionStorageFormData,
  setSessionStorageFormData,
} from "../../persistence/sessionStorage";
import { useFormContext } from "react-hook-form";
import { string } from "prop-types";

export const IdentityForm = ({ formId }) => {
  const {
    watch,
    trigger,
    register,
    formState: { errors },
  } = useFormContext();

  const { firstname, name, surname } = watch();

  const [identityFormState, setIdentityFormState] = useState(
    surname ? "submissible" : "initial"
  );

  const canDisplayNextStepButton =
    !!surname &&
    identityFormState === "submissible" &&
    Object.keys(errors || {}).length === 0;

  const handleClickValidateIdentityFirstPart = () =>
    trigger().then((isValid) =>
      setIdentityFormState(isValid ? "second" : "initial")
    );

  useEffect(() => {
    setIdentityFormState("initial");
  }, [firstname, name]);

  useEffect(() => {
    if (surname) {
      setIdentityFormState("submissible");
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
      {/* Cf. Règle 5 - README */}
      {(identityFormState === "second" ||
        identityFormState === "submissible") && (
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

IdentityForm.propTypes = {
  formId: string.isRequired,
};
