import config from "../config/index.js";
import DevelopmentLogger from "./development-logger.js";
import ProductionLogger from "./production-logger.js";

const logger = () => {
  switch (config.node_env) {
    case "production":
      return ProductionLogger;
    case "development":
      return DevelopmentLogger;
    default:
      return DevelopmentLogger;
  }
};

export default logger();
