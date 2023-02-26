import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VacationsHome from "../pages/vacations/VacationsHome";
import CreateVacationRequest from "../pages/vacations/CreateVacationRequest";
import MyVacationRequests from "../pages/vacations/MyVacationRequests";
import MyVacations from "../pages/vacations/MyVacations";
import PendingVacationsRequests from "../pages/vacations/PendingVacationsRequests";
import CreateOrUpdateVacationCredit from "../pages/vacationsCredit/CreateOrUpdateVacationCredit";
import OfficersVacationsCredit from "../pages/vacationsCredit/OfficersVacationsCredit";
import MyVacationsCredit from "../pages/vacationsCredit/MyVacationsCredit";
//this should be exported to app.js file
let vacationsCreditRoutes = (
  <>
    <Route
      path="/vacationscredit/createorupdate"
      element={
        <RedirectIfNotAuth>
          <CreateOrUpdateVacationCredit />
        </RedirectIfNotAuth>
      }
    />
    <Route
      path="/vacationscredit/myvacationscredit"
      element={
        <RedirectIfNotAuth>
          <MyVacationsCredit />
        </RedirectIfNotAuth>
      }
    />
    <Route
      path="/vacationscredit/officersvacationscredit"
      element={
        <RedirectIfNotAuth>
          <OfficersVacationsCredit />
        </RedirectIfNotAuth>
      }
    />
  </>
);
export default vacationsCreditRoutes;
