import { Router } from "express";
import { Container } from "../../container/container";
import userController from "../../controllers/v1/userController";

export const createV1Router = (container: Container): Router => {
  const router: Router = Router();

  router.use("/get-active-contexts", userController(container));

  return router;
};
