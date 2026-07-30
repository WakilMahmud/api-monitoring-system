import winston from "winston";
import { developmentConsoleFormat } from "./file-format.js";

const DevelopmentLogger = winston.createLogger({
  level: "debug", // Write all logs with importance level of `debug` or higher  (i.e. error, warn, info, http, verbose, debug, but not silly)
  defaultMeta: { service: "api-monitoring-development-service" }, // Injects this object into every log line (Useful when aggregating multi-service logs)

  // Log Output Destinations
  /**
   * Console Transport:
   * Mandatory for Docker/Kubernetes setups!
   * Docker captures stdout/stderr streams from the console to enable commands like `docker logs`.
   * Uses colored text in development.
   */
  transports: [
    new winston.transports.Console({
      format: developmentConsoleFormat,
    }),
  ],
  exitOnError: false, // Prevents the Node.js process from crashing if writing a log file fails (e.g., disk full)
});

export default DevelopmentLogger;
