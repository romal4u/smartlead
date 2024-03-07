import { NextFunction, Request, Response } from 'express'

import Joi from 'joi'
import { ValidationError } from '../../../utils/AppError'

const emailAccountSchema = Joi.object({
  fromName: Joi.string().required().label('From Name'),
  fromEmail: Joi.string().email().required().label('From Email'),
  username: Joi.string().required().label('Username'),
  password: Joi.string().required().label('Password'),
  smtpHost: Joi.string().required().label('SMTP Host'),
  smtpPort: Joi.number().required().label('SMTP Port'),
  smtpEncryption: Joi.string().valid('SSL', 'TLS', 'None').required().label('SMTP Encryption'),
  messagesPerDay: Joi.number().required().label('Messages Per Day'),
  minTimeGap: Joi.number().required().label('Min Time Gap'),
  diffReplyToAddress: Joi.string().valid('').required().label('Reply To Address'),
  imapSettings: Joi.object({
    imapUseDifferentAddress: Joi.boolean().required().label('Use Different Email'),
    imapHost: Joi.string().required().label('IMAP Host'),
    imapPort: Joi.number().required().label('IMAP Port'),
    imapEncryption: Joi.string().valid('SSL', 'TLS', 'None').required().label('IMAP Encryption'),
  }).required().label('IMAP Settings'),
})

export const validateAccount = (req: Request, res: Response, next: NextFunction) => {
    const validationResult = emailAccountSchema.validate(req.body)
  
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message)
    } else {
      next()
    }
  }
