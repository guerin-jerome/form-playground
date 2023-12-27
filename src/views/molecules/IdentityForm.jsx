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

  const [isIdentityFirstPartValid, setValidityIdentityFirstPart] = useState(
    // Cf. Règle 1 - README
    getSessionStorageFormData(formId)?.isIdentityFirstPartValid
  );

  const canDisplayNextStepButton =
    !!surname &&
    isIdentityFirstPartValid &&
    Object.keys(errors || {}).length === 0;

  const handleClickValidateIdentityFirstPart = () =>
    trigger().then((isValid) => setValidityIdentityFirstPart(isValid));

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
      {isIdentityFirstPartValid && (
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
