import { appDataSource } from '../orm/connection'
import { EmailAccount } from '../orm/entities/EmailAccount'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import nodemailer from 'nodemailer'
import { ConflictError, DataNotFoundError, ValidationError } from '../utils/AppError'
import { iEmailAccountData, iEmailBody } from '../interface/iEmailAccount'
import { EmailLogs } from '../orm/entities/EmailLog'
import { v4 as uuidv4 } from 'uuid'

@Service()
export class AccountService {
  private readonly emailAccountRepo: Repository<EmailAccount>
  private readonly emailLogRepo: Repository<EmailLogs>

  constructor() {
    this.emailAccountRepo = appDataSource.getRepository(EmailAccount)
    this.emailLogRepo = appDataSource.getRepository(EmailLogs)
  }

  async createAccount(input: iEmailAccountData) {
    const existingAccount = await this.emailAccountRepo.findOne({ where: { username: input.username } })
    if (existingAccount) {
      throw new ConflictError(`Account with username [${input.username}] already exists`)
    }

    // Validate email account details
    const transporter = nodemailer.createTransport({
      host: input.smtpHost,
      port: input.smtpPort,
      secure: input.smtpEncryption === 'SSL' ? true : false,
      auth: {
        user: input.username,
        pass: input.password,
      },
    })

    try {
      await transporter.verify()

      const { imapSettings, ...accountData } = input

      const account = new EmailAccount()
      Object.assign(account, accountData)
      Object.assign(account, imapSettings)

      const result = await this.emailAccountRepo.save(account)

      return {
        account_id: result.id
      }
    } catch (error) {
      console.error(error)
      throw new ValidationError(error)
    }
  }

  async sendEmail(input: iEmailBody, accountId: number) {
    const to = input.to
    const subject = input.subject
    const emailContent = input.emailContent

    const emailHash = uuidv4()

    const account = await this.emailAccountRepo.findOne({ where: { id: accountId } })

    if (!account) {
      throw new DataNotFoundError('No email account found')
    }

    try {
      const transporter = nodemailer.createTransport({
        host: account.smtpHost,
        port: account.smtpPort,
        secure: account.smtpEncryption === 'SSL',
        auth: {
          user: account.username,
          pass: account.password,
        },
      })

      const trackingPixelUrl = process.env.API_HOST + '/tracking/' + emailHash // URL to your tracking pixel endpoint
      const trackingPixel = `<img src="${trackingPixelUrl}" width="1" height="1" style="display:none" />`

      const mailOptions = {
        from: `${account.fromName} <${account.fromEmail}>`,
        to,
        subject,
        html: emailContent + trackingPixel,
        cc: 'romalpatel19@gmail.com',
        // cc: 'vaibhav@five2one.com.au',
      }

      await transporter.sendMail(mailOptions)

      const emailLog = new EmailLogs()
      emailLog.account_id = accountId
      emailLog.to_email = to
      emailLog.subject = subject
      emailLog.email_content = emailContent
      emailLog.emailHash = emailHash
      await this.emailLogRepo.save(emailLog)

      return {
        emailHash
      }
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async trackEmail(emailHash: any) {
    await this.emailLogRepo.update({ emailHash }, { is_open: 1 })
    return true
  }
}
