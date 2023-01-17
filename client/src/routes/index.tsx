import Header from "../components/Header";
import React, { Suspense, lazy, useEffect } from "react";

import RedirectIfNotAuth from "../middlewares/routesMiddlewares/RedirectIfNotAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Home } from "../pages/home/HomePage";
import userRoutes from "./userRoutes";
import shiftsRoutes from "./shiftsRoutes";
import { useNavigate } from "react-router-dom";
import HorizontalSpinner from "../components/HorizontalSpinner";
import Home from "../pages/home/Home";
import vacationsRoutes from "./vacationsRoutes";
import vacationsCreditRoutes from "./vacationsCreditRoutes";

const ForeOtherRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  });
  return <></>;
};
//this should be exported to app.js file
let routes = (
  <BrowserRouter>
    <Header />
    <div className="container">
      <Suspense fallback={<HorizontalSpinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectIfNotAuth>
                {/* <>home</> */}
                <Home />
              </RedirectIfNotAuth>
            }
          />
          {userRoutes}
          {shiftsRoutes}
          {vacationsRoutes}
          {vacationsCreditRoutes}
          <Route
            path="/*"
            element={
              <RedirectIfNotAuth>
                <ForeOtherRoutes />
              </RedirectIfNotAuth>
            }
          />
        </Routes>
      </Suspense>
    </div>
  </BrowserRouter>
);
export default routes;
