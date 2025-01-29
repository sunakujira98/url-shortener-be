/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto'

import * as URLShortenerRepository from '../repositories/url-shortener.repository'

import * as URLShortenerService from './url-shortener.service'

jest.mock('crypto', () => ({
  createHash: jest.fn(),
  randomBytes: jest.fn(),
}))

jest.mock('../repositories/url-shortener.repository')

describe('URL shortener service', () => {
  const mockCreateHash = jest.spyOn(crypto, 'createHash')
  const mockRandomBytes = jest.spyOn(crypto, 'randomBytes')
  const mockGetByShortUrl = jest.spyOn(URLShortenerRepository, 'getByShortUrl')
  const mockCreate = jest.spyOn(URLShortenerRepository, 'create')

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.DEFAULT_SHORT_URL_LENGTH = '1'
  })

  describe('create', () => {
    it('should create a short URL successfully', async () => {
      const mockHashInstance = {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue('abc123=='),
      }

      mockCreateHash.mockReturnValue(mockHashInstance as any)
      mockRandomBytes.mockReturnValue({
        toString: () => 'mockedsalt',
      } as any)

      mockGetByShortUrl.mockResolvedValue(null)
      mockCreate.mockResolvedValue({
        id: 1,
        long_url: 'https://example.com',
        short_url: 'a',
        visit: 0,
      })

      const result = await URLShortenerService.create('https://example.com')

      expect(result).toEqual({ shortURL: 'a' })
      expect(mockCreate).toHaveBeenCalledWith({
        long_url: 'https://example.com',
        short_url: 'a',
        visit: 0,
      })
    })

    it('should retry with different salt if short URL already exists', async () => {
      const mockHashInstance = {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValueOnce('abc123==').mockReturnValueOnce('def456=='),
      }

      mockCreateHash.mockReturnValue(mockHashInstance as any)
      mockRandomBytes.mockReturnValue({
        toString: () => 'mockedsalt',
      } as any)

      mockGetByShortUrl
        .mockResolvedValueOnce({ id: 1, long_url: 'existing.com', short_url: 'a', visit: 0 })
        .mockResolvedValueOnce(null)

      mockCreate.mockResolvedValue({
        id: 2,
        long_url: 'https://example.com',
        short_url: 'd',
        visit: 0,
      })

      const result = await URLShortenerService.create('https://example.com')

      expect(result).toEqual({ shortURL: 'd' })
      expect(mockGetByShortUrl).toHaveBeenCalledTimes(2)
      expect(mockCreate).toHaveBeenCalledTimes(1)
    })

    it('should throw error after max attempts', async () => {
      const mockHashInstance = {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue('abc123=='),
      }

      mockCreateHash.mockReturnValue(mockHashInstance as any)
      mockRandomBytes.mockReturnValue({
        toString: () => 'mockedsalt',
      } as any)

      mockGetByShortUrl.mockResolvedValue({
        id: 1,
        long_url: 'existing.com',
        short_url: 'a',
        visit: 0,
      })

      await expect(URLShortenerService.create('https://example.com', 3)).rejects.toThrow(
        'Unable to create URL Shortener. Please try again later.',
      )

      expect(mockCreate).not.toHaveBeenCalled()
    })
  })
})
