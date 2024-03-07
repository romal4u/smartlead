import { Request, Response, NextFunction } from 'express'
import { appDataSource } from '../orm/connection'
import { EmailAccount } from '../orm/entities/EmailAccount'
import { AuthorizationError } from '../utils/AppError'
import { format } from 'date-fns'

export const checkSendEmailLimit = async (req: Request, res: Response, next: NextFunction) => {
  const accountId = Number(req.params.account_id)

  const today = format(new Date(), 'yyyy-MM-dd')

  const accountData = await appDataSource
    .getRepository(EmailAccount)
    .createQueryBuilder('account')
    .leftJoin('account.emailLogs', 'emailLogs')
    .select('account.id', 'id')
    .addSelect('COUNT(emailLogs.id)', 'emailCount')
    .addSelect('account.messagesPerDay', 'messagesPerDay')
    .where('account.id = :accountId', { accountId })
    .andWhere('DATE(emailLogs.created_at) = :today', { today })
    .groupBy('account.id')
    .getRawOne()


  if (accountData && accountData.emailCount >= accountData.messagesPerDay) {
    return next(
      new AuthorizationError(
        `You have reached the limit of ${accountData.messagesPerDay} emails per day. Please try again tomorrow.`,
      ),
    )
  }
  next()
}
