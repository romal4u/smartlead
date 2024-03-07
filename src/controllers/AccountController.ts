import { Request, Response } from 'express'
import { AccountService } from '../services/AccountService'
import { Service } from 'typedi'

@Service()
export class AccountController {
  private readonly accountService: AccountService

  constructor() {
    this.accountService = new AccountService()
  }

  async createAccount(req: Request, res: Response) {
    const result = await this.accountService.createAccount(req.body)
    return res.status(200).json({ status: 'success', message: 'Email account added successfully', data: result })
  }

  async sendEmail(req: Request, res: Response) {
    const accountId = Number(req.params.account_id)

    const result = await this.accountService.sendEmail(req.body, accountId)
    return res.status(200).json({ status: 'success', message: 'Email sent success', data: result })
  }

  async trackEmail(req: Request, res: Response) {

    const emailHash = req.params.h

    await this.accountService.trackEmail(emailHash)
    return res.status(200).json({ status: 'success', message: 'Email track success' })
  }
}
