import { Layer1 } from "../../views/layers/Layer1";
import { Layer2 } from "../../views/layers/Layer2";
import { Layer3 } from "../../views/layers/Layer3";
import { Form } from "../../views/molecules/Form";

const stepFormRules = {
    "layer1.input1": [
        "layer1.input3",
        "layer1.input2", 
        "layer2.input2"
    ]
}

export const StepForm = () => {

  const onSubmit = (data) => {
    console.info("Submit form with data => ", data);
  };

  return (
    <>
      <h1>step form</h1>
      <Form id="stepForm" onSubmit={onSubmit} rules={stepFormRules}>
          <Layer1 /> <br />
          <Layer2 /> <br />
          <Layer3 /> <br />
          <input type="submit" />
        </Form>
      <div></div>
    </>
  );
};
