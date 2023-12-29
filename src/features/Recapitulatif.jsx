import { Steps } from "../constants/course";
import { STORAGE_KEYS } from "../constants/persistence";
import { useCRUDPersistence } from "../hooks/useCRUDPersistence";

export const Recapitulatif = () => {
  /**
   * Hook gestion session storage
   */
  const { getItem: getIdentityItem } = useCRUDPersistence({
    pageId: Steps.identity.name,
  });
  const { getItem: getBirthItem } = useCRUDPersistence({
    pageId: Steps.birth.name,
  });

  /**
   * Modele de vue
   */
  const { firstname, name, surname } =
    getIdentityItem({ storageKey: STORAGE_KEYS.formData }) || {};
  const { birthdate, birthplace } =
    getBirthItem({ storageKey: STORAGE_KEYS.formData }) || {};

  return (
    <section>
      <h1>Récapitulatif</h1>
      <ul>
        <li>Identité</li>
        <ul>
          <li>Nom : {name}</li>
          <li>Prénom : {firstname}</li>
          <li>Surnom : {surname}</li>
        </ul>
        <li>Naissance</li>
        <ul>
          <li>Date : {birthdate}</li>
          <li>Commune : {birthplace}</li>
        </ul>
      </ul>
    </section>
  );
};
