import { useNavigate } from "react-router-dom";
import { Form } from "../atoms/StepForm";
import { Steps } from "../../tree";
import { Input } from "../atoms/Input";

export const IdentityForm = () => {
  const navigate = useNavigate();

  const handleSubmitIdentityForm = (data) => {
    console.debug("Submit identity form with data => ", data);
    navigate("/birth");
  };

  const identityFormInvalidationRules = {
    firstname: ["name", "surname"],
    name: ["surname"],
  };

  return (
    <>
      <h1>Informations d&apos;identité</h1>
      <Form
        id={Steps.identity.name}
        onSubmit={handleSubmitIdentityForm}
        rules={identityFormInvalidationRules}
      >
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
        <Input
          label="Surnom :"
          name="surname"
          type="text"
          options={{ required: true }}
        />
        <button type="submit">Soumettre</button>
      </Form>
    </>
  );
};
