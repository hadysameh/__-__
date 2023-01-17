import RedirectIfAuth from "../middlewares/routesMiddlewares/RedirectIfAuth";
import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShiftsForm } from "../features/shifts";
//this should be exported to app.js file
let shiftsRoutes = (
  <>
    <Route
      path="/creatshifts"
      element={
        <RedirectIfAuth>
          <ShiftsForm />
        </RedirectIfAuth>
      }
    />
  </>
);
export default shiftsRoutes;
