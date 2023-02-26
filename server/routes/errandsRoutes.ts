import AuthController from "../controllers/auth/AuthController";
import express from "express";
import isAuth from "../middelwares/auth/isAuth";
import ErrandsController from "../controllers/errands/ErrandsController";

const errandsRouter = express.Router();

errandsRouter.get(
  "/errand/geterrandstobeapprovedcount",
  isAuth,
  ErrandsController.getPendingErrandsToBeApprovedCount
);

errandsRouter.get(
  "/errand/getcreateerrandoptions",
  isAuth,
  ErrandsController.getCreateErrandOptions
);

errandsRouter.get("/errand", isAuth, ErrandsController.get);

errandsRouter.get("/errand/getone", isAuth, ErrandsController.getOne);

errandsRouter.post("/errand/store", isAuth, ErrandsController.store);

errandsRouter.put("/errand/update", isAuth, ErrandsController.update);

errandsRouter.delete("/errand/delete", isAuth, ErrandsController.delete);

export default errandsRouter;
