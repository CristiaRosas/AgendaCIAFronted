import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router"
import { SeguimientoPage } from "../pages/SeguimientoPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SeguimientoPage />,
  },
]);

const MyRoutes = () =><RouterProvider router={router} />;

export default MyRoutes;