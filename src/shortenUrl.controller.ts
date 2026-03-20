import { enc, SHA256 } from "crypto-js";
import { Request, Response } from "express";
import { ShortenUrlModel } from "./model";
import producer from "./producer";

class Controller {
  createShortenUrl = async (req: Request, res: Response) => {
    // using which hash function that supports 10^12 values
    const url = req.body.url;

    if (!url) {
      return res.status(400).send({ message: "url is not defined" });
    }

    if (typeof url !== "string") {
      return res.status(400).send({ message: "url is not a string" });
    }

    if (await ShortenUrlModel.findOne({ url })) {
      return res
        .status(407)
        .send({ message: "shorten url's already generated" });
    }
    let result;
    let attempt = 0;

    while (true) {
      // Combine base + attempt to create new hash each probe
      const raw = `${url}:${attempt}`;
      const id = SHA256(raw).toString(enc.Hex).slice(0, 12);

      if (!(await ShortenUrlModel.exists({ _id: id }))) {
        result = await ShortenUrlModel.create({ _id: id, url });
        break;
      }

      attempt++;

      if (attempt > 1000) {
        // Optional safety guard
        // maybe a good time to reconsider hashing function
        return res.send({
          message: "Something wrong with the application. Try again later",
        });
      }
    }

    res.status(201).send(result);
  };
  getShortenUrl = async (req: Request, res: Response) => {
    // get the actual url and redirect, and then add 1 to clickCount
    const urlId = req.params.urlId;
    const shortenUrl = await ShortenUrlModel.findById(urlId);

    if (!shortenUrl) {
      return res.status(404).send({ message: "url not found" });
    }
    await producer.send({
      topic: "click-count",
      messages: [{ value: JSON.stringify({ shortenUrlId: urlId }) }],
    });
    res.redirect(shortenUrl.url);
  };

  getShortenUrlStats = async (req: Request, res: Response) => {
    // get the clickCount
    const shortenUrl = await ShortenUrlModel.findById(req.params.urlId);

    if (!shortenUrl) {
      return res.status(404).send({ message: "url not found" });
    }
    return res.status(200).send({ data: shortenUrl });
  };
}

export const shortenUrlController = new Controller();
