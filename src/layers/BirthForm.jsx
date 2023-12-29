import { useFormContext } from "react-hook-form";
import { Input } from "../components/atoms/Input";

export const BirthForm = () => {
  /**
   * Hook useform
   */
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Input
        label="Date de naissance :"
        type="text"
        errorMessage={errors?.birthdate?.message}
        {...register("birthdate", { required: "Ce champs est requis" })}
      />
      <Input
        label="Commune de naissance :"
        type="text"
        errorMessage={errors?.birthplace?.message}
        {...register("birthplace", { required: "Ce champs est requis" })}
      />
      <button type="submit">Soumettre</button>
    </>
  );
};
