import { PrismaClient } from '@prisma/client'

import { TBaseURL, TURL } from '../types/url-shortener.types'

const prisma = new PrismaClient()

export const getByShortUrl = async (shortUrl: string): Promise<TURL | null> => {
  const existingUrlShorterner = await prisma.urlShortener.findFirst({
    where: {
      short_url: shortUrl,
    },
  })

  return existingUrlShorterner
}

export const create = async (data: TBaseURL): Promise<TURL> => {
  const urlShortener = await prisma.urlShortener.create({ data })

  return urlShortener
}

export const update = async (id: number, data: TBaseURL): Promise<TURL | null> => {
  const urlShortener = await prisma.urlShortener.update({
    where: { id },
    data: {
      long_url: data.long_url,
      short_url: data.short_url,
      visit: data.visit,
    },
  })

  return urlShortener
}
