import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'

import * as URLShortenerService from '../services/url-shortener.service'
import { handleRequestError } from '../middleware/handleRequestError'

export const getURLShortener = async (req: Request, res: Response) => {
  try {
    const result = await URLShortenerService.getByShortURL(req.params.shortUrl)

    res.status(HttpStatusCode.Ok).send(result)
  } catch (error: unknown) {
    handleRequestError(res, error)
  }
}

export const createURLShortener = async (req: Request, res: Response) => {
  try {
    const result = await URLShortenerService.create(req.body.url, 10)

    res.status(HttpStatusCode.Created).send(result)
  } catch (error: unknown) {
    handleRequestError(res, error)
  }
}
