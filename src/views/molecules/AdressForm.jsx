import { ADRESS_FORM } from "../../tree";
import { Form } from "../atoms/Form";
import { Input } from "../atoms/Input";

export const AdressForm = () => {
  const { id: formId, title, items, defaultValues } = ADRESS_FORM;

  return (
    <>
      <h1>{title}</h1>
      <Form
        id={formId}
        initialValues={defaultValues}
        onSubmit={(data) => console.debug("Submit form with data => ", data)}
      >
        {items.map((item) => (
          <Input key={`${formId}.${item.name}`} {...item} />
        ))}
        <button type="submit">Valider</button>
      </Form>
    </>
  );
};
