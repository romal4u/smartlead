import { NextFunction, Request, Response } from 'express'

import Joi from 'joi'
import { ValidationError } from '../../../utils/AppError'

const sendEmailSchema = Joi.object({
  to: Joi.string().email().required().label('To email'),
  subject: Joi.string().required().label('Subject line'),
  emailContent: Joi.string().required().label('Email content'),
})

export const validateSendEmail = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = sendEmailSchema.validate(req.body)

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message)
  } else {
    next()
  }
}


const sendEmailParamSchema = Joi.object({
    account_id: Joi.number().required().label('Account id'),
  })
  
  export const validateSendEmailParam = (req: Request, res: Response, next: NextFunction) => {
    const validationResult = sendEmailParamSchema.validate(req.params)
  
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message)
    } else {
      next()
    }
  }
  