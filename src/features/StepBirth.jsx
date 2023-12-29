import { Form } from "../components/molecules/Form";
import { useCRUDPersistence } from "../hooks/useCRUDPersistence";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../constants/persistence";
import { BirthForm } from "../layers/BirthForm";
import { Steps } from "../constants/course";

export const StepBirth = () => {
  /**
   * Modele de vue
   */
  const formId = Steps.birth.name;
  const invalidationRules = {
    birthdate: ["birthplace"],
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
  const handleSubmitBirthForm = (data) => {
    updateItem({ storageKey: STORAGE_KEYS.formData, data });
    navigate(`/${Steps.recapitulatif.name}`);
  };

  return (
    <>
      <h1>Informations de naissance</h1>
      <Form
        id={formId}
        onSubmit={handleSubmitBirthForm}
        invalidationRules={invalidationRules}
      >
        <BirthForm />
      </Form>
    </>
  );
};
