import { techLogger } from '../util/logger.js'
import { getImageList, getImage, getImageMultipleKeywords, getImageForward, getImageRegex, indexImages, indexKeywords } from '../models/image-queries.js'

import { urlsToImages, urlsToKeywords, sortResult } from '../util/fn-util.js'
import { imageUrls } from '../util/image-urls.js'

// Get all images
export const getImageListController = async (req, res) => {
  try {
    const images = await getImageList()
    res.status(200).json({
      message: images,
      success: true,
    })
  } catch (error) {
    techLogger.error(error.message)
    res.status(500).json({
      message: error.message,
      success: false,
    })
  }
}

// Get images with forward indexing
export const getImageForwardController = async (req, res) => {
  try {
    const keyword = req.params.keyword
    const images = await getImageForward(keyword)
    res.status(200).json({
      message: images,
      success: true,
    })
  } catch (error) {
    techLogger.error(error.message)
    res.status(500).json({
      message: error.message,
      success: false,
    })
  }
}

// Get images with inverted indexing
export const getImageKeywordController = async (req, res) => {
  try {
    const keyword = req.params.keyword
    const images = await getImage(keyword)
    res.status(200).json({
      message: images,
      success: true,
    })
  } catch (error) {
    techLogger.error(error.message)
    res.status(500).json({
      message: error.message,
      success: false,
    })
  }
}

// Get images with inverted indexing and multiple keywords
export const getImageKeywordsController = async (req, res) => {
  try {
    const keyword = req.params.keyword
    const images = await getImageMultipleKeywords(keyword)
    const sortedImages = sortResult(images)
    console.log(sortedImages)z
    res.status(200).json({
      message: sortedImages,
      success: true,
    })
  } catch (error) {
    techLogger.error(error.message)
    res.status(500).json({
      message: error.message,
      success: false,
    })
  }
}

// Get images with inverted indexing / regex
export const getImageRegexController = async (req, res) => {
  try {
    const regex = req.params.regex
    const images = await getImageRegex(regex)
    const sortedImages = sortResult(images)
    res.status(200).json({
      message: sortedImages,
      success: true,
    })
  } catch (error) {
    techLogger.error(error.message)
    res.status(500).json({
      message: error.message,
      success: false,
    })
  }
}

// Index images from urls in './src/util/image-urls.js'
export const indexImagesController = async (req, res) => {
  try {
    const formatedImages = await urlsToImages(imageUrls)
    const images = await indexImages(formatedImages)
    const formatedKeywords = await urlsToKeywords(images)
    const keywords = await indexKeywords(formatedKeywords)
    res.status(200).json({
      message: {
        images,
        keywords,
      },
      success: true,
    })
  } catch (error) {
    techLogger.error(error.message)
    res.status(500).json({
      message: error.message,
      success: false,
    })
  }
}
