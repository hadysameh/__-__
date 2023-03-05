import RedirectIfAuth from "../middlewares/routesMiddlewares/RedirectIfAuth";
import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShiftsForm } from "../features/shifts";
import ShiftsHome from "../pages/shifts/ShiftsHome";
import CreateShifts from "../pages/shifts/CreateShifts";
import ShowShifts from "../pages/shifts/ShowShifts";
//this should be exported to app.js file
let shiftsRoutes = (
  <>
    <Route
      path="/shifts"
      element={
        <RedirectIfNotAuth>
          <ShiftsHome />
        </RedirectIfNotAuth>
      }
    />
    <Route
      path="/shifts/show"
      element={
        <RedirectIfNotAuth>
          <ShowShifts />
        </RedirectIfNotAuth>
      }
    />
    <Route
      path="/shifts/createorupdate"
      element={
        <RedirectIfNotAuth>
          <CreateShifts />
        </RedirectIfNotAuth>
      }
    />
  </>
);
export default shiftsRoutes;
