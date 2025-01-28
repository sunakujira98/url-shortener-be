import dotenv from 'dotenv'

import app from './app'
import logger from './utils/logger'

dotenv.config()

const port = process.env.PORT || 8000

app.listen(port, () => {
  logger.info(`Apps running on port ${port}`)
})
