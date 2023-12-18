export const ADRESS_FORM = {
  step: 3,
  path: "adress",
  id: "adressForm",
  title: "Informations d'adresse",
  items: [
    { label: "Adresse :", name: "adress", itemId: 301, group: 1 },
    { label: "Commune :", name: "town", itemId: 302, group: 1 },
    { label: "Code postal :", name: "zipcode", itemId: 303 },
  ],
  defaultValues: {
    town: "Niort",
  },
};

export const COURSE = [ADRESS_FORM];
