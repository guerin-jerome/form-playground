import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StepIdentity } from "./features/StepIdentity";
import { StepBirth } from "./features/StepBirth";
import { Recapitulatif } from "./features/Recapitulatif";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StepIdentity />,
  },
  {
    path: "birth",
    element: <StepBirth />,
  },
  {
    path: "recapitulatif",
    element: <Recapitulatif />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
