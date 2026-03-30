import { getModelForClass, prop } from "@typegoose/typegoose";
import { QueryFilter } from "mongoose";

class ShortenUrl {
  @prop({ required: true })
  url: string;

  @prop({ required: true })
  _id: string;

  @prop({ required: true, default: 0 })
  clickCount: number;
}

export type ShortenUrlQueryFilter = QueryFilter<ShortenUrl>;

export type ShortenUrlPayload = Partial<ShortenUrl>;

export const ShortenUrlModel = getModelForClass(ShortenUrl);
