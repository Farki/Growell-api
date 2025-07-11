import {Logger} from "winston";
import {data} from "../../data/dummy";
import {NotFoundError} from "../../errors/NotFoundError";

export default class UserService {
  constructor(private readonly logger: Logger) {}

  public getUserContexts(userName?: string) {
    const userExists = data.contexts.some(context => context.userName === userName);
    if(!userExists) {
      throw new NotFoundError("User not found")
    }

    return data.contexts.filter(context => context.userName === userName && context.contextIsActive);
  }
}