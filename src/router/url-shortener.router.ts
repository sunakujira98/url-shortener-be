import express from 'express'

import { createURLShortener, getURLShortener } from '../controllers/url-shortener.controller'
import { CreateURLShortenerSchema, RequiredShortURLSchema } from '../middleware/schema/url-shortener.schema'
import { validateData } from '../middleware/validateData'

const router = express.Router()

router.get('/:shortUrl', validateData({ params: RequiredShortURLSchema }), getURLShortener)
router.post('/', validateData({ body: CreateURLShortenerSchema }), createURLShortener)

export default router
