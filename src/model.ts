import { getModelForClass, prop } from "@typegoose/typegoose";

class ShortenUrl {
  @prop({ required: true })
  url: string;

  @prop({ required: true })
  _id: string;

  @prop({ required: true, default: 0 })
  clickCount: number;
}

export const ShortenUrlModel = getModelForClass(ShortenUrl);
