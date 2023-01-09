import { Express } from "express";

// import { saderRouter } from "../features/sader";
// import { waredRouter } from "../features/wared";
// import { homeRouter } from "../features/home";
import authRouter from "./authRoutes";
import officersRouter from "./officersRoutes";
import vacationsRouter from "./vacationRoutes";
// console.log(routes)

export let routesAssigner = (app: Express): void => {
  //   app.use("/api/", saderRouter);
  //   app.use("/api/", waredRouter);
  //   app.use("/api/", homeRouter);
  app.use("/api/", authRouter);
  app.use("/api/", officersRouter);
  app.use("/api/", vacationsRouter);
};
