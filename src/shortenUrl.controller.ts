import { enc, SHA256 } from "crypto-js";
import { Request, Response } from "express";
import { redis } from "./cache";
import producer from "./producer";
import { shortenUrlService } from "./shortenUrl.service";

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

    if (await shortenUrlService.checkShortenUrlExists({ url })) {
      return res
        .status(407)
        .send({ message: "shorten url's already generated" });
    }
    let result;
    let attempt = 0;

    while (true) {
      // Combine base + attempt to create new hash each probe
      const raw = `${url}:${attempt}`;
      const id = SHA256(raw).toString(enc.Base64).slice(0, 8);

      // locking mechanism
      // distributed locking is one option, currently feasible for local application
      // the other option is generating whole database from the beginning with empty url and use row lock with transactional findAndUpdate, more reasonable since it only involves database querying
      const lockShortenUrlCacheKey = `lock:${id}`;

      if (
        await redis.set(
          lockShortenUrlCacheKey,
          url,
          "EX",
          Math.floor(15 + 5 * Math.random()),
          "NX",
        )
      ) {
        if (!(await shortenUrlService.checkShortenUrlExists({ _id: id }))) {
          result = await shortenUrlService.createShortenUrl({ _id: id, url });
          await redis.del(lockShortenUrlCacheKey);
          break;
        }
        await redis.del(lockShortenUrlCacheKey);
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
    // using cache for reduce database read
    let shortenUrl = await redis.get(urlId);

    if (!shortenUrl) {
      const shortenUrlDocument =
        await shortenUrlService.findShortenUrlById(urlId);

      if (!shortenUrlDocument) {
        return res.status(404).send({ message: "url not found" });
      }
      shortenUrl = shortenUrlDocument.url;
      await redis.set(
        urlId,
        shortenUrl,
        "EX",
        Math.floor(30 * 60 + 5 * 60 * Math.random()),
      );
    }
    // using fire-and-forget producer to not await for acknowledgement
    producer
      .send({
        topic: "click-count",
        messages: [
          {
            value: JSON.stringify({
              shortenUrlId: urlId,
            }),
          },
        ],
      })
      .catch((e) => {
        console.log(e);
      });
    res.redirect(shortenUrl);
  };

  getShortenUrlStats = async (req: Request, res: Response) => {
    // get the clickCount
    const shortenUrl = await shortenUrlService.findShortenUrlById(
      req.params.urlId,
    );

    if (!shortenUrl) {
      return res.status(404).send({ message: "url not found" });
    }
    return res.status(200).send({ data: shortenUrl });
  };
}

export const shortenUrlController = new Controller();
