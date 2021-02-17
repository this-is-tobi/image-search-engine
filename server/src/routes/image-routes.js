import express from 'express'

import {
  getImageListController,
  getImageForwardController,
  getImageKeywordController,
  getImageKeywordsController,
  getImageRegexController,
  indexImagesController,
} from '../controllers/image-controllers.js'

const router = new express.Router()

router.get('/', getImageListController)
// router.get('/myImageFromKeywordForward/:keyword', getImageForwardController)
// router.get('/myImageFromKeyword/:keyword', getImageKeywordController)
router.get('/myImageFromKeywords/:keyword', getImageKeywordsController)
router.get('/myImageFromRegex/:regex', getImageRegexController)
router.get('/indexImages', indexImagesController)

export default router
