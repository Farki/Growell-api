import { Logger } from "winston";
import { getLogger } from "../utils/logger";
import createUserService from "../services/UserService";
import UserService from "../services/UserService/UserService";

export interface Container {
  logger: Logger;
  userService: UserService;
}

let containerInstance: Container | null = null;

/**
 * Creates a singleton DI container.
 */
export const createContainer = (): Container => {
  if (containerInstance) {
    return containerInstance;
  }

  const logger = getLogger();
  const userService = createUserService(logger);

  return { logger, userService };
};
