import { NextFunction, Request, Response } from 'express'

import Joi from 'joi'
import { ValidationError } from '../../../utils/AppError'

const emailHashSchema = Joi.object({
  h: Joi.string().required().label('Email hash'),
})

export const validateEmailHash = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = emailHashSchema.validate(req.params)

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message)
  } else {
    next()
  }
}
