import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IdentityForm } from "./views/molecules/IdentityForm";
import { AdressForm } from "./views/molecules/AdressForm";
import { BirthForm } from "./views/molecules/BirthForm";
import { Recapitulatif } from "./views/molecules/Recapitulatif";
import { StepForm } from "./features/stepForm/StepForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IdentityForm />,
  },
  {
    path: "birth",
    element: <BirthForm />,
  },
  {
    path: "adress",
    element: <AdressForm />,
  },
  {
    path: "recapitulatif",
    element: <Recapitulatif />,
  },
  {
    path: "step1",
    element: <StepForm />,
  },
  {
    path: "step2",
    element: <StepForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
