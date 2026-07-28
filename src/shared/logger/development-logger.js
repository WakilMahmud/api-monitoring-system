import winston from "winston";

const devConsoleFormat = winston.format.combine(
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
      format: devConsoleFormat,
    }),
  ],
  exitOnError: false, // Prevents the Node.js process from crashing if writing a log file fails (e.g., disk full)
});

export default DevelopmentLogger;
