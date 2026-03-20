import { kafka } from "./broker";

// for prevent event duplication due to internal kafka retry
const producer = kafka.producer({ idempotent: true });

producer.connect();

export default producer;
