import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VacationsHome from "../pages/vacations/VacationsHome";
import CreateVacation from "../pages/vacations/CreateVacation";
import MyVacationRequests from "../pages/vacations/MyVacationRequests";
import MyVacations from "../pages/vacations/MyVacations";
import PendingVacationsRequests from "../pages/vacations/PendingVacationsRequests";
import OfficersVacations from "../pages/vacations/OfficersVacations";
//this should be exported to app.js file
let vacationsRoutes = (
  <>
    <Route
      path="/vacations"
      element={
        <RedirectIfNotAuth>
          <VacationsHome />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/vacations/create"
      element={
        <RedirectIfNotAuth>
          <CreateVacation />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/vacations/myvacationrequests"
      element={
        <RedirectIfNotAuth>
          <MyVacationRequests />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/vacations/myvacations"
      element={
        <RedirectIfNotAuth>
          <MyVacations />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/vacations/pendingvacationstoapprove"
      element={
        <RedirectIfNotAuth>
          <PendingVacationsRequests />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/vacations/officersvacations"
      element={
        <RedirectIfNotAuth>
          <OfficersVacations />
        </RedirectIfNotAuth>
      }
    />
  </>
);
export default vacationsRoutes;
