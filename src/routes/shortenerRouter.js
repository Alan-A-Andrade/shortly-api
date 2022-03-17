import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { generateShortUrl } from "../controllers/shortenerController.js";


const shortenerRouter = Router();
shortenerRouter.post('/urls/shorten', validateTokenMiddleware, generateShortUrl);
export default shortenerRouter;