import { HttpStatusCode } from 'axios'
import AppError from '../../AppError'

export class URLShortenerNotFoundError extends AppError {
  constructor() {
    super(HttpStatusCode.NotFound)
    this.name = 'err.URL_SHORTENER_NOT_FOUND_ERROR'
    this.message = 'No records found from current short URL.'
  }
}
