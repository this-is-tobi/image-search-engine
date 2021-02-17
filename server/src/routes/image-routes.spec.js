import bodyParser from 'body-parser'
import request from 'supertest'
import express from 'express'

import { getConnection, closeConnections } from '../connect.js'

import imageRouter from './image-routes.js'
// import { repeatFn } from '../__tests__/fp-util.js'

describe('', () => {
  let mongodbMemServer
  beforeAll(async () => {
    mongodbMemServer = await getConnection()
  })

  afterAll(async () => {
    return closeConnections(mongodbMemServer)
  })

  const app = express()
  app.use(bodyParser.json())
  app.use(exampleimageRouterRouter)

  it('should return a list of images', async () => {
    // Given
    // const example1 = createRandomExample()
    // await createExample(example1)

    // When
    const response = await request(app)
      .get('/')
      .expect('content-type', /^application\/json/)
      .expect(200)

    // Then
    expect(response.body).toHaveProperty('success', true)
    expect(response.body.message).toBeDefined()
  })
})
