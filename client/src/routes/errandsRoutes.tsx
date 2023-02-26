import { Route } from "react-router-dom";
import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import AddErrandReport from "../pages/errand/AddErrandReport";
import CreateErrandRequest from "../pages/errand/CreateErrandRequest";
import ErrandsHome from "../pages/errand/ErrandsHome";
import ErrandsRequestsForPrint from "../pages/errand/ErrandsRequestsForPrint";
import MyErrands from "../pages/errand/MyErrands";
import MyErrandsRequests from "../pages/errand/MyErrandsRequests";
import OfficersErrands from "../pages/errand/OfficersErrands";
import OfficersErrandsReports from "../pages/errand/OfficersErrandsReports";
import PendingErrandRquests from "../pages/errand/PendingErrandRquests";

//this should be exported to app.js file
let errandsRoutes = (
  <>
    <Route
      path="/errands"
      element={
        <RedirectIfNotAuth>
          <ErrandsHome />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/errands/myerrands"
      element={
        <RedirectIfNotAuth>
          <MyErrands />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/errands/myerrandsrequests"
      element={
        <RedirectIfNotAuth>
          <MyErrandsRequests />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/errands/create"
      element={
        <RedirectIfNotAuth>
          <CreateErrandRequest />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/errands/adderrandreport"
      element={
        <RedirectIfNotAuth>
          <AddErrandReport />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/errands/pendingerrandstoapprove"
      element={
        <RedirectIfNotAuth>
          <PendingErrandRquests />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/errands/officerserrand"
      element={
        <RedirectIfNotAuth>
          <OfficersErrands />
        </RedirectIfNotAuth>
      }
    />

    <Route
      path="/errands/officerserrandsreports"
      element={
        <RedirectIfNotAuth>
          <OfficersErrandsReports />
        </RedirectIfNotAuth>
      }
    />
    <Route
      path="/errands/errandsrequestsforprint"
      element={
        <RedirectIfNotAuth>
          <ErrandsRequestsForPrint />
        </RedirectIfNotAuth>
      }
    />
  </>
);
export default errandsRoutes;
