import { Request, Response, Router } from 'express'

import smtpSettings from './smtpSettings'

const router = Router()

router.use('/', smtpSettings)


export default router