import {Container} from "../../container/container";
import {Request, Response, Router} from "express";
import {checkSchema} from "express-validator";
import {validateRequest} from "../../middlewares/validateRequest";
import {HttpStatusCodes} from "../../utils/enums";
import {baseSchema} from "./validations/baseSchema";

interface QueryParams {
  userName?: string;
}

export default ({userService}: Container) => {
  const router = Router();

  router.get(
    "/",
    checkSchema(baseSchema),
    validateRequest,
    async (req: Request, res: Response) => {
      const { userName } = req.query as QueryParams;

      const contexts = userService.getUserContexts(userName);

      res.status(HttpStatusCodes.Ok).json({
        contexts
      });
    },
  );

  return router;
}