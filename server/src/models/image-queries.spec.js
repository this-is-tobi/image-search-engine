import { getConnection, closeConnections } from '../connect'
import { createRandomImage } from './__tests__/image-util.js'

import {
  createImage,
  getImage,
  _deleteImages,
} from './image-queries'

describe('Image queries', () => {
  let mongodbMemServer
  beforeAll(async () => {
    mongodbMemServer = await getConnection()
  })

  afterAll(async () => {
    return closeConnections(mongodbMemServer)
  })

  afterEach(async () => {
    const deleteAllImages = async () => _deleteImages({})
    return deleteAllImages()
  })

  it('Should find image', async () => {
    // Given
    const firstLeanImage = createRandomImage()
    await createImage(firstLeanImage)

    // When
    const image = await getImage()

    // Then
    expect(image).toBeDefined()
    expect(image.length).toBeGreaterThanOrEqual(1)
  })
})
