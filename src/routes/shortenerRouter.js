import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { generateShortUrl, getShortenedUrl, deleteShortenedUrl } from "../controllers/shortenerController.js";


const shortenerRouter = Router();
shortenerRouter.post('/urls/shorten', validateTokenMiddleware, generateShortUrl);
shortenerRouter.get('/urls/:shortUrl', getShortenedUrl)
shortenerRouter.delete('/urls/:id', validateTokenMiddleware, deleteShortenedUrl);


export default shortenerRouter;