import { isUndefined, omitBy } from 'lodash'

class AppError extends Error {
  attribute?: string

  status: number

  constraints?: Record<string, string | object>

  details?: Array<{ field: string; message: string }>

  constructor(status: number) {
    super()
    this.status = status
  }

  toJson() {
    return {
      status: 'error',
      error: omitBy(
        {
          code: this.name,
          message: this.message,
          status: this.status,
          constraints: this.constraints,
          details: this.details && this.details,
        },
        isUndefined,
      ),
    }
  }
}

export default AppError
