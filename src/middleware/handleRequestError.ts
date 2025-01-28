import { Response } from 'express'

import AppError from '../error/AppError'
import { InternalServerError } from '../error/common/InternalServerError'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleRequestError = (res: Response, err: any): void => {
  if (err instanceof AppError) {
    res.status(err.status || 500).json(err.toJson())
  } else {
    res.status(500).send(new InternalServerError().toJson())
  }
}
