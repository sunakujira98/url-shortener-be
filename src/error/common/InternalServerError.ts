import { HttpStatusCode } from 'axios'

import AppError from '../AppError'

export class InternalServerError extends AppError {
  constructor() {
    super(HttpStatusCode.InternalServerError)
    this.name = 'err.INTERNAL_SERVER_ERROR'
    this.message = 'Something went wrong, please try again later'
  }
}
