import winston from "winston";

/**
 * Production Log Format (JSON)
 * Formats logs into structured JSON objects.
 * Essential for cloud log aggregators (e.g., Datadog, ElasticSearch, Grafana Loki)
 * to easily parse, filter, and search logs by metadata fields.
 */
export const productionConsoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(), // Outputs the final log entry as a single-line JSON string
);

// Format for Console (with colors)
export const developmentConsoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }), // Colorizes log levels (e.g., ERROR = red, INFO = green, DEBUG = blue)
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Adds a human-readable timestamp to every log entry
  winston.format.errors({ stack: true }), // Automatically captures and formats Error object stack traces (`err.stack`)
  winston.format.splat(), // Enables string interpolation like: logger.info("User %s logged in", userId)

  // Custom printer: controls how the log string is arranged in your terminal
  winston.format.printf(
    ({ timestamp, level, message, stack, service, ...meta }) => {
      let log = `[${timestamp}] [${level}]: ${message}`;

      // Append extra metadata (if provided) as a stringified object
      if (Object.keys(meta).length) log += ` ${JSON.stringify(meta)}`;

      // Print the full stack trace on a new line if an error occurred
      if (stack) log += `\n${stack}`;

      return log;
    },
  ),
);

// Format for log Files (clean text without ANSI color codes)
export const logFileFormat = productionConsoleFormat;
