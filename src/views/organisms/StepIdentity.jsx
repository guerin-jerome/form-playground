import { Steps } from "../../tree";
import { Form } from "../atoms/Form";
import { useNavigate } from "react-router-dom";
import { IdentityForm } from "../molecules/IdentityForm";

export const StepIdentity = () => {
  const formId = Steps.identity.name;

  const invalidationRules = {
    firstname: ["name", "surname"],
    name: ["surname"],
  };

  const navigate = useNavigate();

  const handleSubmitIdentityForm = (data) => {
    console.debug("Submit identity form with data => ", data);
    navigate("/birth");
  };

  return (
    <>
      <h1>Informations d&apos;identité</h1>
      <Form
        id={formId}
        onSubmit={handleSubmitIdentityForm}
        invalidationRules={invalidationRules}
      >
        <IdentityForm formId={formId} />
      </Form>
    </>
  );
};
