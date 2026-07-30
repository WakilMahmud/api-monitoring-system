import winston from "winston";
import { productionConsoleFormat } from "./file-format.js";

const transports = [
  new winston.transports.Console({
    format: productionConsoleFormat,
  }),
];

const ProductionLogger = winston.createLogger({
  level: "info",
  defaultMeta: { service: "api-monitoring-production-service" },
  transports,
  exitOnError: false,
});

export default ProductionLogger;
