import { Steps } from "../../tree";
import { Input } from "../atoms/Input";
import { StepForm } from "../atoms/StepForm";

export const AdressForm = () => (
  <>
    <h1>Informations d&apos;adresse</h1>
    <StepForm
      id={Steps.adress.name}
      defaultValues={{ city: "Niort" }}
      onSubmit={(data) => console.debug("Submit form with data => ", data)}
    >
      <Input
        label="Adresse"
        name="address"
        type="text"
        options={{ required: true }}
      />
      <Input
        label="Code postal"
        name="zipCode"
        type="text"
        options={{ required: true }}
      />
      <Input
        label="Ville"
        name="city"
        type="text"
        options={{ required: true }}
      />
      <button type="submit">Soumettre</button>
    </StepForm>
  </>
);
