export const urlsToImages = (urls) => {
  return urls.map(url => {
    return url.includes('photo')
      ? {
          url: url,
          keywords: url
            .split('photo/')[1]
            .split('_')[0]
            .split('-'),
        }
      : url.includes('vector')
        ? {
            url: url,
            keywords: url
              .split('vector/')[1]
              .split('_')[0]
              .split('-'),
          }
        : {
            url: url,
            keywords: url
              .split('psd/')[1]
              .split('_')[0]
              .split('-'),
          }
  })
}

export const urlsToKeywords = (images) => {
  let keywords = []
  images.forEach(async image => {
    image.keywords.forEach(keyword => {
      const keywordPosition = image.keywords.indexOf(keyword)
      const score = 1 - keywordPosition / image.keywords.length
      const index = keywords.indexOf(keywords.find(el => el.word === keyword))
      if (index === -1) {
        keywords = [
          ...keywords,
          {
            word: keyword,
            images: [
              {
                imageId: image._id,
                score: score,
              },
            ],
          },
        ]
      } else {
        keywords[index].images = [
          ...keywords[index].images,
          {
            imageId: image._id,
            score: score,
          },
        ]
      }
    })
  })
  return keywords
}

export const sortResult = (result) => {
  if (result.length < 2) {
    return result.map(keyword => {
      return {
        word: keyword.word,
        images: keyword.images.sort((a, b) => b.score - a.score),
      }
    })
  } else {
    return result.map(keyword => {
      return {
        word: keyword.word,
        images: [keyword.images.sort((a, b) => b.score - a.score)[0]],
      }
    })
  }
}
