import { Steps } from "../constants/course";
import { useNavigate } from "react-router-dom";
import { useCRUDPersistence } from "../hooks/useCRUDPersistence";
import { STORAGE_KEYS } from "../constants/persistence";
import { Form } from "../components/molecules/Form";
import { IdentityForm } from "../layers/IdentityForm";

export const StepIdentity = () => {
  const formId = Steps.identity.name;

  const { updateItem } = useCRUDPersistence({ pageId: formId });

  const invalidationRules = {
    firstname: ["surname"],
    name: ["surname"],
  };

  const navigate = useNavigate();

  const handleSubmitIdentityForm = (data) => {
    updateItem({ storageKey: STORAGE_KEYS.formData, data });
    navigate(`/${Steps.birth.name}`);
  };

  return (
    <>
      <h1>Informations d&apos;identité</h1>
      <Form
        id={formId}
        onSubmit={handleSubmitIdentityForm}
        invalidationRules={invalidationRules}
      >
        <IdentityForm />
      </Form>
    </>
  );
};
