import { useNavigate } from "react-router-dom";
import { StepForm } from "../atoms/StepForm";
import { Steps } from "../../tree";
import { Input } from "../atoms/Input";

export const IdentityForm = () => {
  const navigate = useNavigate();

  const handleSubmitIdentityForm = (data) => {
    console.debug("Submit identity form with data => ", data);
    navigate("/birth");
  };

  return (
    <>
      <h1>Informations d&apos;identité</h1>
      <StepForm id={Steps.identity.name} onSubmit={handleSubmitIdentityForm}>
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
        <button type="submit">Soumettre</button>
      </StepForm>
    </>
  );
};
