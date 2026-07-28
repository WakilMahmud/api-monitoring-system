import winston from "winston";
import "winston-daily-rotate-file";
import config from "../config/index.js";

/**
 * Production Log Format (JSON)
 * Formats logs into structured JSON objects.
 * Essential for cloud log aggregators (e.g., Datadog, ElasticSearch, Grafana Loki)
 * to easily parse, filter, and search logs by metadata fields.
 */
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(), // Outputs the final log entry as a single-line JSON string
);

const transports = [
  new winston.transports.Console({
    format: fileFormat,
  }),
];

const ProductionLogger = winston.createLogger({
  level: "info",
  defaultMeta: { service: "api-monitoring-production-service" },
  transports,
  exitOnError: false,
});

/**
 * File Rotation Setup (Skipped during unit testing)
 * Prevents writing log files when automated tests run to keep the test suite clean.
 */
if (config.node_env !== "test") {
  /**
   * Error File Rotation:
   * Captures ONLY `error` level logs into dedicated files for fast incident triage.
   */
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: "logs/error-%DATE%.log", // Creates files like: error-2026-07-27.log
      datePattern: "YYYY-MM-DD", // Rotates daily at midnight
      level: "error", // Only log messages with level 'error'
      maxSize: "20m", // Roll over to a new file if current log reaches 20MB
      maxFiles: "14d", // Auto-delete log files older than 14 days to free disk space
      zippedArchive: true, // Compress older files into .gz format (~90% space savings)
      format: fileFormat,
    }),
  );

  /**
   * Combined File Rotation:
   * Captures ALL logs (info, warn, error, debug) for general audit trails and traffic analysis.
   */
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "30d", // Retains general logs for 30 days
      zippedArchive: true,
      format: fileFormat,
    }),
  );
}

export default ProductionLogger;
