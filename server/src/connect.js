import mongoose from 'mongoose'
import delay from 'delay'

import { techLogger } from './util/logger.js'

const isTest = process.env.NODE_ENV === 'test'
const isCI = process.env.CI === 'true'
const DELAY_BEFORE_RETRY = isTest ? 5 : 2000
let closingConnections = false

const mongoOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

const mongodbMemServers = {}

export async function getConnection (triesLeft = 5) {
  if (closingConnections || triesLeft <= 0) {
    throw new Error('Impossible de se connecter au serveur MongoDB')
  }
  triesLeft--
  const dbHost = process.env.DB_HOST
  const dbPort = process.env.DB_PORT
  const dbUser = process.env.DB_USER
  const dbPasswd = process.env.DB_PASS
  const dbName = process.env.DB_NAME
  const mongoDbUri = process.env.MONGODB_URL || `mongodb://${dbUser}:${dbPasswd}@${dbHost}:${dbPort}/${dbName}`

  let mongoUri = mongoDbUri
  let mongodbMemServer
  if (isTest || isCI) {
    let { default: MongoMemoryServer } = await import('mongodb-memory-server')
    if (typeof MongoMemoryServer !== 'function') { // This depends on whether ESM are transpiled (for jest) or not
      MongoMemoryServer = MongoMemoryServer.MongoMemoryServer
    }
    mongodbMemServer = new MongoMemoryServer()
    mongoUri = await mongodbMemServer.getUri()
    mongodbMemServers[mongoDbUri] = mongodbMemServer
  }

  try {
    techLogger.info(`Trying to connect to MongoDB with: ${mongoUri}`)
    await mongoose.connect(mongoUri, mongoOptions)
    techLogger.info('Connected to MongoDB!')
    if (isTest) {
      return mongodbMemServer
    }
  } catch (error) {
    await mongodbMemServer?.stop()

    if (triesLeft > 0) {
      techLogger.info(`Could not connect to MongoDB: ${error.message}`)
      techLogger.info(`Retrying (${triesLeft} tries left)`)
      await delay(DELAY_BEFORE_RETRY)
      return getConnection(triesLeft)
    }

    techLogger.info(`Could not connect to MongoDB: ${error.message}`)
    techLogger.info('Out of retries')
    error.message = `Out of retries, last error: ${error.message}`
    throw error
  }
}

export async function closeConnections (mongodbMemServer) {
  closingConnections = true
  try {
    mongoose.disconnect()
    if (!isTest) {
      return
    }

    if (mongodbMemServer) {
      return mongodbMemServer.stop()
    }

    // `mongodbMemServer` was not send as argument, it stoped due to a non treated error
    // Stocked `mongodbMemServers` should be delete
    for (const [mongoUri, server] of Object.entries(mongodbMemServers)) {
      await server?.stop()
      delete mongodbMemServers[mongoUri]
    }
  } catch (error) {
    techLogger.error(error)
  }
}
