import Image from './image-model.js'
import Keyword from './keyword-model.js'

export const getImageList = async () => {
  const images = await Image.find({})
  const result = [
    {
      images: images,
    },
  ]
  return result
}

export const getImageForward = async (query) => {
  const images = await Image.find({ keywords: query })
  return images
}

export const getImage = async (query) => {
  const keyword = await Keyword.findOne({ word: query })
  const images = await Image.find({ _id: keyword.images })
  return images
}

export const getImageMultipleKeywords = async (query) => {
  const formatedQuery = await query.trim().split(' ')
  const keywords = await Keyword.aggregate([
    {
      $match: {
        word: {
          $in: formatedQuery,
        },
      },
    },
    {
      $lookup: {
        from: 'images',
        localField: 'images.imageId',
        foreignField: '_id',
        as: 'images_doc',
      },
    },
  ])

  const result = keywords.map(keyword => {
    return {
      word: keyword.word,
      images: mergeById(keyword.images, keyword.images_doc),
    }
  })
  return result
}

export const getImageRegex = async (query) => {
  const keywords = await Keyword.aggregate([
    {
      $match: {
        word: { $regex: query },
      },
    },
    {
      $lookup: {
        from: 'images',
        localField: 'images.imageId',
        foreignField: '_id',
        as: 'images_doc',
      },
    },
  ])

  const result = keywords.map(keyword => {
    return {
      word: keyword.word,
      images: mergeById(keyword.images, keyword.images_doc),
    }
  })
  console.log(result)
  return result
}

export const indexImages = async (images) => {
  await Image.deleteMany({})
  const result = await Image.insertMany(images)
  return result
}

export const indexKeywords = async (keywords) => {
  await Keyword.deleteMany({})
  const result = await Keyword.insertMany(keywords)
  return result
}

const mergeById = (a1, a2) => {
  return a1.map(itm => ({
    ...itm,
    ...a2.find(item => item._id.toString() === itm.imageId.toString() && item),
  }))
}
