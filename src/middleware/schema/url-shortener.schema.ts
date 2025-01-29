import { z } from 'zod'

export const CreateURLShortenerSchema = z.object({
  url: z
    .string({
      required_error: 'URL is required',
    })
    .min(1, 'URL must be at least 1 characters')
    .max(2048, 'URL max length is 2048 characters') //https://serpstat.com/blog/how-long-should-be-the-page-url-length-for-seo/#:~:text=Browsers'%20URL%20Length%20Limits,URL%20is%2075%20characters%20long.
    .url('Invalid URL Format'),
})

export const RequiredShortURLSchema = z.object({
  shortUrl: z.string().min(1, 'ID is required'),
})
