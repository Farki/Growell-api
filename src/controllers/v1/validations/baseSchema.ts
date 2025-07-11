import { Schema } from "express-validator";

export const baseSchema: Schema = {
  userName: {
    in: "query",
    exists: {
      errorMessage: "userName must be provided in params",
    },
    notEmpty: {
      errorMessage: "userName cannot be empty",
    },
  },
};
