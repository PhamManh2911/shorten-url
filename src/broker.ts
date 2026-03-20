import { Kafka } from "kafkajs";
import { ENV } from "./configs/env";

export const kafka = new Kafka({
  clientId: "shorten-url",
  brokers: ENV.APP_KAFKA_BROKERS,
});
