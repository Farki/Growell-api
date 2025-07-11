import { Logger } from "winston";
import UserService from "./UserService";

export default function createUserService(
  logger: Logger,
): UserService {
  return new UserService(logger);
}
