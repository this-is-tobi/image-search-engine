import dotenv from 'dotenv'
import http from 'http'
import fs from 'fs'

import app from './app.js'
import { getConnection, closeConnections } from './connect.js'
import { techLogger } from './util/logger.js'

export const DEFAULT_PORT = 4000

const port = getPort()
startServer(port)
handleExit()

const isTest = process.env.NODE_ENV === 'test'

export async function startServer (port) {
  try {
    await getConnection()
  } catch (error) {
    techLogger.error(error.message)
    throw error
  }

  techLogger.info('server connected to mongodb, reading init-db.js')

  try {
    const { initDb } = await import('./init-db.js')
    if (!isTest && initDb) {
      await initDb()
      techLogger.info('initDb invoked successfully, cleaning up')
      await new Promise((resolve, reject) => {
        fs.unlink('./src/init-db.js', (err) => {
          if (err) reject(err)
          techLogger.info('Successfully deleted ./init-db.js')
          resolve()
        })
      })
    }
  } catch (error) {
    if (error.code === 'ERR_MODULE_NOT_FOUND' || error.message.startsWith('Cannot find module')) {
      techLogger.info('No initDb file, skipping')
    } else {
      techLogger.warn(error.message)
      throw error
    }
  }

  http.createServer(app).listen(port, '0.0.0.0')
  techLogger.info(`server running at http://localhost:${port}`)
}

export function getPort () {
  dotenv.config()
  const port = process.env.SERVER_API_PORT || DEFAULT_PORT
  return +port
}

export function handleExit () {
  process.on('exit', exitGracefuly)

  // This will handle kill commands, such as CTRL+C:
  process.on('SIGINT', exitGracefuly)
  process.on('SIGTERM', exitGracefuly)

  // This will prevent dirty exit on code-fault crashes:
  process.on('uncaughtException', exitGracefuly)
}

export async function exitGracefuly (error) {
  if (error instanceof Error) {
    techLogger.error(error)
  }
  techLogger.info('Closing connections...')
  await closeConnections()
  techLogger.info('Exiting...')
  process.exit(error instanceof Error ? 1 : 0)
}
