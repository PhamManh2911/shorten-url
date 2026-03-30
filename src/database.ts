import { mongoose } from "@typegoose/typegoose";
import { ENV } from "./configs/env";

(async function () {
  // using single-leader replication database for better resolving write conflict
  await mongoose.connect(ENV.APP_MONGO_DB_CONNECTION_STRING, {
    dbName: "shorten-url",
  });
  mongoose.set("debug", true);
  console.log("=====> Database connected");
})();
