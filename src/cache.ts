import Redis from "ioredis";
import { ENV } from "./configs/env";

export const redis = new Redis(ENV.APP_CACHE_CONNECTION_STRING);
