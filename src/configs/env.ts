import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  APP_PORT: process.env.APP_PORT || 3000,
  APP_MONGO_DB_CONNECTION_STRING:
    process.env.APP_MONGO_DB_CONNECTION_STRING || "mongodb://localhost:27017/",
  APP_KAFKA_BROKERS: (process.env.APP_KAFKA_BROKERS || "localhost:9092").split(
    ",",
  ),
  APP_CACHE_CONNECTION_STRING:
    process.env.APP_CACHE_CONNECTION_STRING || "redis://127.0.0.1:6379",
};
