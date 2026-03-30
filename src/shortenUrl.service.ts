import {
  ShortenUrlModel,
  ShortenUrlPayload,
  ShortenUrlQueryFilter,
} from "./model";

class Service {
  checkShortenUrlExists = async (query: ShortenUrlQueryFilter) => {
    return await ShortenUrlModel.exists(query);
  };

  createShortenUrl = async (payload: ShortenUrlPayload) => {
    return await ShortenUrlModel.create(payload);
  };

  findShortenUrlById = async (id: string) => {
    return await ShortenUrlModel.findById(id);
  };
}

export const shortenUrlService = new Service();
