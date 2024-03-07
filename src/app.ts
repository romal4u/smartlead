import 'dotenv/config'

import 'reflect-metadata'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import "express-async-errors"
import swaggerUi from 'swagger-ui-express'
import { errorHandler } from './middleware/errorHandler'
import { appDataSource } from './orm/connection'
import routes from './routes'
import { apiDocumentation } from './docs'
import path from 'path'

appDataSource
  .initialize()
  .then(() => {
    console.log(`Database connection success.`)
  })
  .catch((err: any) => {
    console.error(`Data Source initialization error`, err)
  })

const app = express()
app.disable('x-powered-by')
app.use(cors({ credentials: true, origin: true }))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation))

errorHandler(app)

export { app }
