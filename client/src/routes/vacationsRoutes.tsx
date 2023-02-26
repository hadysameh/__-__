import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VacationsHome from "../pages/vacations/VacationsHome";
import CreateVacationRequest from "../pages/vacations/CreateVacationRequest";
import MyVacationRequests from "../pages/vacations/MyVacationRequests";
import MyVacations from "../pages/vacations/MyVacations";
import PendingVacationsRequests from "../pages/vacations/PendingVacationsRequests";
import OfficersVacations from "../pages/vacations/OfficersVacations";
import CreateVacationForOfficer from "../pages/vacations/CreateVacationForOfficer";
import VacationRequestsForPrint from "../pages/vacations/VacationRequestsForPrint";
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
          <CreateVacationRequest />
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

    <Route
      path="/vacations/createvacationsforofficer"
      element={
        <RedirectIfNotAuth>
          <CreateVacationForOfficer />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/vacations/vacationsrequestsforprint"
      element={
        <RedirectIfNotAuth>
          {/* <CreateVacationForOfficer /> */}
          <VacationRequestsForPrint></VacationRequestsForPrint>
        </RedirectIfNotAuth>
      }
    />
  </>
);
export default vacationsRoutes;
