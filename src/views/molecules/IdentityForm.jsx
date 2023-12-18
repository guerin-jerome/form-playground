export const IdentityForm = () => (
  <>
    <h1>Informations d&apos;identité</h1>
    <form>
      <fieldset>
        <legend>Sélectionner votre civilité :</legend>

        <div>
          <input type="radio" id="male" name="male" value="male" checked />
          <label htmlFor="male">Homme</label>
        </div>

        <div>
          <input type="radio" id="female" name="female" value="female" />
          <label htmlFor="female">Femme</label>
        </div>

        <div>
          <input type="radio" id="other" name="other" value="other" />
          <label htmlFor="other">Autre</label>
        </div>
      </fieldset>

      <label htmlFor="name">Nom :</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="firstname">Prénom :</label>
      <input type="text" id="firstname" name="firstname" />

      <button type="submit">Valider</button>
    </form>
  </>
);
