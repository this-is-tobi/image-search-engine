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
<<<<<<< HEAD
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

const KMPTable = (word) => {
  const T = []
  let i = 0
  let j = -1
  T[0] = j

  while (word.charAt(i) !== '') {
    if ((word.charAt(i) === word.charAt(j)) && j < ((i + (i % 2)) / 2)) {
      T[i + 1] = j + 1
      j++
      i++
    } else if (j > 0) {
      j = T[j]
    } else {
      T[i + 1] = 0
      i++
      j = 0
    }
  }
  return T
}

export const KMPSearch = (word, text) => {
  let m = 0
  let n = 0
  const T = KMPTable(word)
  while (text.charAt(m + n) !== '' && word.charAt(n) !== '') {
    if (text.charAt(m + n) === word.charAt(n)) {
      n++
    } else {
      m += n - T[n]
      if (n > 0) {
        n = T[n]
=======
>>>>>>> :fire: Remove unused/unnecessary code
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
