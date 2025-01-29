/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from 'axios'
import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

import AppError from '../error/AppError'

type ValidationSchemas = {
  params?: z.ZodObject<any, any>
  body?: z.ZodObject<any, any>
}

export function validateData(schemas: ValidationSchemas) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate params if schema provided
      if (schemas.params && Object.keys(req.params).length > 0) {
        req.params = await schemas.params.parseAsync(req.params)
      }

      // Validate body if schema provided
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body)
      }

      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = new AppError(HttpStatusCode.BadRequest)
        validationError.name = 'err.VALIDATION_ERROR'
        validationError.message = 'Validation failed'
        validationError.details = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }))

        res.status(HttpStatusCode.BadRequest).json(validationError.toJson())
        return next(validationError)
      }

      res.status(HttpStatusCode.InternalServerError).json({
        status: 'error',
        error: {
          code: 'err.INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error',
          status: HttpStatusCode.InternalServerError,
        },
      })
      return next(error)
    }
  }
}
