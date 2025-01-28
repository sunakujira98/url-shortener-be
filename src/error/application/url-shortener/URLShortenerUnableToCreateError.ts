import { HttpStatusCode } from 'axios'
import AppError from '../../AppError'

export class URLShortenerUnableToCreateError extends AppError {
  constructor() {
    super(HttpStatusCode.BadRequest)
    this.name = 'err.URL_SHORTENER_UNABLE_TO_CREATE_ERROR'
    this.message = 'Unable to create URL Shortener. Please try again later.'
  }
}
