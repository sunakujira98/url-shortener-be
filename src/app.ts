import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import URLShortenerRoutes from './router/url-shortener.router'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://cendekin.netlify.app'],
  }),
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/check', (req, res) => {
  res.status(200).json({ status: 'OK' })
})
app.use('/api/url-shortener', URLShortenerRoutes)

export default app
