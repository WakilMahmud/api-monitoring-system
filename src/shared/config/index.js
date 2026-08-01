const config = {
  // Server
  node_env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),

  // postgreSQL
  postgres: {
    host: process.env.PG_HOST || "localhost",
    port: parseInt(process.env.PG_PORT || "5432", 10),
    database: process.env.PG_DATABASE || "default_api_monitoring",
    user: process.env.PG_USER || "default_postgres_user",
    password: process.env.PG_PASSWORD || "default_postgres_pass",
  },

  // Mongodb
  mongo: {
    uri:
      process.env.MONGO_URI ||
      "mongodb://localhost:27017/default_api_monitoring",
    dbName: process.env.MONGO_DATABASE || "default_api_monitoring",
  },

  // RabbitMQ
  rabbitmq: {
    url:
      process.env.RABBITMQ_URL ||
      "amqp://localhost:5672/default_api_monitoring",
    queue: process.env.RABBITMQ_QUEUE || "default_api_hits",
    publisherConfirms:
      process.env.RABBITMQ_PUBLISHER_CONFIRMS === "true" || false, // Publisher Confirms in RabbitMQ is a mechanism that guarantees a message was successfully received and handled by the RabbitMQ broker before your code moves on.
    retryAttempts: parseInt(process.env.RABBITMQ_RETRY_ATTEMPTS || "3", 10),
    retryDelay: parseInt(process.env.RABBITMQ_RETRY_DELAY || "1000", 10),
  },
};

Object.freeze(config);

export default config;
