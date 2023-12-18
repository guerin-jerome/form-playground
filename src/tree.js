export const ADRESS_FORM = {
  step: 3,
  path: "adress",
  id: "adressForm",
  title: "Informations d'adresse",
  items: [
    { label: "Adresse :", name: "adress", item: 301 },
    { label: "Commune :", name: "town", item: 302 },
    { label: "Code postal :", name: "zipcode", item: 303 },
  ],
  defaultValues: {
    town: "Niort",
  },
};

export const COURSE = [ADRESS_FORM];
