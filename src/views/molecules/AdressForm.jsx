import { Steps } from "../../tree";
import { Input } from "../atoms/Input";
import { StepForm } from "../atoms/StepForm";
import { useNavigate } from "react-router-dom";

export const AdressForm = () => {
  const navigate = useNavigate();

  const handleSubmitAdressForm = (data) => {
    console.debug("Submit adress form with data => ", data);
    navigate("/recapitulatif");
  };

  return (
    <>
      <h1>Informations d&apos;adresse</h1>
      <StepForm id={Steps.adress.name} onSubmit={handleSubmitAdressForm}>
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
      </StepForm>
    </>
  );
};
