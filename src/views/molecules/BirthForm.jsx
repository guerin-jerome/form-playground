export const BirthForm = () => (
  <>
    <h1>Informations de naissance</h1>
    <form>
      <div>
        <label htmlFor="birthdate">Date de naissance :</label>
        <input type="date" id="birthdate" name="birthdate" />
        <button>Vérifier</button>
      </div>

      <label htmlFor="birthplace">Commune de naissance :</label>
      <input type="text" id="birthplace" name="birthplace" />

      <button type="submit">Valider</button>
    </form>
  </>
);
