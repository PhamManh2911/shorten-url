import "./configs/env";
import "./database";

import { kafka } from "./broker";
import { ShortenUrlModel } from "./model";

(async function () {
  const consumer = kafka.consumer({ groupId: "click-count-consumer" });

  await consumer.connect();
  await consumer.subscribe({ topic: "click-count", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value?.toString() ?? "") as {
        shortenUrlId: string;
      };
      const { shortenUrlId } = value;

      await ShortenUrlModel.updateOne(
        { _id: shortenUrlId },
        { $inc: { clickCount: 1 } },
      );
    },
  });
})();
