import crypto from 'crypto'

import { URLShortenerNotFoundError } from '../error/application/url-shortener/URLShortenerNotFoundError'
import { URLShortenerUnableToCreateError } from '../error/application/url-shortener/URLShortenerUnableToCreateError'
import * as URLShortenerRepository from '../repositories/url-shortener.repository'
import { TGenerateShortURL, TShorterURLSecureResult, TURL } from '../types/url-shortener.types'

const generateSecureHash = async (url: string, length: number = 8): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256')
    hash.update(Buffer.from(url))
    resolve(hash.digest('base64').replace(/[+/=]/g, '').slice(0, length))
  })
}

const generateShortURL = async (params: TGenerateShortURL) => {
  let attempts = 0
  const { maxAttempts, url } = params
  let currentLength = Number(process.env.DEFAULT_SHORT_URL_LENGTH) || 4

  while (attempts <= maxAttempts) {
    const timestamp = Date.now()
    const salt = crypto.randomBytes(8).toString('hex')
    const uniqueString = `${url}-${timestamp}-${salt}-${attempts}`
    const shortURL = await generateSecureHash(uniqueString, currentLength)

    const existingURLShortener = await URLShortenerRepository.getByShortUrl(shortURL)

    if (!existingURLShortener) {
      await URLShortenerRepository.create({
        long_url: url,
        short_url: shortURL,
        visit: 0,
      })

      return {
        shortURL,
      }
    }
    attempts++

    if (attempts === maxAttempts && currentLength < 8) {
      currentLength++
      attempts = 0
    }
  }
  throw new URLShortenerUnableToCreateError()
}

export const getByShortURL = async (shortUrl: string): Promise<TURL> => {
  const existingURL = await URLShortenerRepository.getByShortUrl(shortUrl)

  if (!existingURL) {
    throw new URLShortenerNotFoundError()
  }

  const updatedExistingURL = await URLShortenerRepository.update(existingURL.id, {
    ...existingURL,
    visit: existingURL.visit + 1,
  })

  return updatedExistingURL
}

export const create = async (url: string, maxAttempts: number = 10): Promise<TShorterURLSecureResult> => {
  const result = await generateShortURL({
    maxAttempts,
    url,
  })

  return result
}
