import { HttpStatusCodes } from "../utils/enums";

export const healthController =
  (container: any) => async (req: any, res: any) => {
    const isDBReady = true;
    const isRedisReady = true;

    res.status(HttpStatusCodes.Ok).json({
      status: isDBReady && isRedisReady ? "ok" : "nok",
      services: {
        database: isDBReady ? "ok" : "nok",
        redis: isRedisReady ? "ok" : "nok",
      },
    });
  };
