import express from "express";
import config from "./shared/config/index.js";
import logger from "./shared/logger/index.js";

const app = express();
const port = config.port || 5000;

/**
 * Request logging middleware
 * Logs the HTTP method, path, IP address, and user agent for each incoming request.
 */
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Hello API Monitoring System");
});

app.listen(port, () => {
  //   logger.info("API Monitoring System started");
  console.log(`Server is running on port ${port}`);
});
