import { getSessionStorageFormValues } from "../../persistence/sessionStorage";
import { Steps } from "../../tree";

export const Recapitulatif = () => {
  const { firstname, name, gender } =
    getSessionStorageFormValues(Steps.identity.name) || {};
  const { birthdate, birthplace } =
    getSessionStorageFormValues(Steps.birth.name) || {};
  const { adress, zipcode, city } =
    getSessionStorageFormValues(Steps.adress.name) || {};

  return (
    <section>
      <h1>Récapitulatif</h1>
      <ul>
        <li>Identité</li>
        <ul>
          <li>Civilité : {gender}</li>
          <li>Nom : {name}</li>
          <li>Prénom : {firstname}</li>
        </ul>
        <li>Naissance</li>
        <ul>
          <li>Date : {birthdate}</li>
          <li>Commune : {birthplace}</li>
        </ul>
        <li>Adresse</li>
        <ul>
          <li>Adresse : {adress}</li>
          <li>Commune : {city}</li>
          <li>Code postal : {zipcode}</li>
        </ul>
      </ul>
    </section>
  );
};
