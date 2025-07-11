import "dotenv/config";

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  debug: process.env.APP_DEBUG === "true",
  corsUrl: process.env.CORS_URL,
  logDirectory: process.env.LOG_DIR || "logs",
};

export default config;
