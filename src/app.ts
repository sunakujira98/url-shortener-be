import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'

import URLShortenerRoutes from './router/url-shortener.router'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/check', (req, res) => {
  res.status(200).json({ status: 'OK' })
})
app.use('/api/url-shortener', URLShortenerRoutes)

export default app
