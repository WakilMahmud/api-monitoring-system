import winston from "winston";
import "winston-daily-rotate-file";
import config from "../config/index.js";
import { ENVIRONMENT_TYPES } from "../constant.js";
import DevelopmentLogger from "./development-logger.js";
import { logFileFormat } from "./file-format.js";
import ProductionLogger from "./production-logger.js";

const environment = config.node_env;

const getEnvironmentLogger = () => {
  switch (environment) {
    case ENVIRONMENT_TYPES.PRODUCTION:
      return ProductionLogger;
    case ENVIRONMENT_TYPES.DEVELOPMENT:
      return DevelopmentLogger;
    default:
      return DevelopmentLogger;
  }
};

const logger = getEnvironmentLogger();

/**
 * File Rotation Setup (Skipped during unit testing)
 * Prevents writing log files when automated tests run to keep the test suite clean.
 */
if (environment !== ENVIRONMENT_TYPES.TEST) {
  /**
   * Error File Rotation:
   * Captures ONLY `error` level logs into dedicated files for fast incident triage.
   */
  logger.add(
    new winston.transports.DailyRotateFile({
      filename: `logs/error-%DATE%.${environment}.log`, // Creates files like: error-2026-07-27.log
      datePattern: "YYYY-MM-DD", // Rotates daily at midnight
      level: "error", // Only log messages with level 'error'
      maxSize: "20m", // Roll over to a new file if current log reaches 20MB
      maxFiles: "14d", // Auto-delete log files older than 14 days to free disk space
      zippedArchive: true, // Compress older files into .gz format (~90% space savings)
      format: logFileFormat,
    }),
  );

  /**
   * Combined File Rotation:
   * Captures ALL logs (info, warn, error, debug) for general audit trails and traffic analysis.
   */
  logger.add(
    new winston.transports.DailyRotateFile({
      filename: `logs/combined-%DATE%.${environment}.log`,
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d", // Retains general logs for 30 days
      zippedArchive: true,
      format: logFileFormat,
    }),
  );
}

export default logger;
