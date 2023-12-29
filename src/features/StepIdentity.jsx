import { Steps } from "../constants/course";
import { useNavigate } from "react-router-dom";
import { useCRUDPersistence } from "../hooks/useCRUDPersistence";
import { STORAGE_KEYS } from "../constants/persistence";
import { Form } from "../components/molecules/Form";
import { IdentityForm } from "../layers/IdentityForm";

export const StepIdentity = () => {
  /**
   * Modele de vue
   */
  const formId = Steps.identity.name; 
  const invalidationRules = {
    firstname: ["surname"],
    name: ["surname"],
  };

  /**
   * Hook gestion session storage
   */
  const { updateItem } = useCRUDPersistence({ pageId: formId });

  /**
   * Hook react router
   */
  const navigate = useNavigate();

  /**
   * Hanlder lors de la soumission du formulaire
   * @param {*} data valeur soumise par useForm
   */
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
