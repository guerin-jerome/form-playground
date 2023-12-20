import { useNavigate } from "react-router-dom";
import { StepForm } from "../atoms/StepForm";
import { Steps } from "../../tree";
import { Input } from "../atoms/Input";

export const BirthForm = () => {
  const navigate = useNavigate();

  const handleSubmitBirthForm = (data) => {
    console.debug("Submit birth form with data => ", data);
    navigate("/adress");
  };

  return (
    <>
      <h1>Informations de naissance</h1>
      <StepForm id={Steps.birth.name} onSubmit={handleSubmitBirthForm}>
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
      </StepForm>
    </>
  );
};
