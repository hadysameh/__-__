import { Express } from "express";

// import { saderRouter } from "../features/sader";
// import { waredRouter } from "../features/wared";
// import { homeRouter } from "../features/home";
import authRouter from "./authRoutes";
import errandsRouter from "./errandsRoutes";
import officersRouter from "./officersRoutes";
import vacationsCreditRouter from "./vacationsCreditRoutes";
import vacationsRouter from "./vacationsRoutes";

// console.log(routes)

export let routesAssigner = (app: Express): void => {
  //   app.use("/api/", saderRouter);
  //   app.use("/api/", waredRouter);
  //   app.use("/api/", homeRouter);
  app.use("/api/", authRouter);
  app.use("/api/", officersRouter);
  app.use("/api/", vacationsRouter);
  app.use("/api/", vacationsCreditRouter);
  app.use("/api/", errandsRouter);
};
