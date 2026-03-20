import { Router } from "express";
import { shortenUrlController } from "./shortenUrl.controller";

const router = Router();

router.post("/", shortenUrlController.createShortenUrl);
router.get("/:urlId", shortenUrlController.getShortenUrl);
router.get("/:urlId/stats", shortenUrlController.getShortenUrlStats);

export default router;
