import { AccountController } from '../../controllers/AccountController'
import { Request, Response, Router } from 'express'
import { validateAccount } from '../../middleware/validation/account'
import Container from 'typedi'
import { validateSendEmail, validateSendEmailParam } from '../../middleware/validation/account/validateSendEmail'
import { checkSendEmailLimit } from '../../middleware/checkSendEmailLimit'
import { validateEmailHash } from '../../middleware/validation/account/validateEmailHash'

const router = Router()

const accountController = Container.get(AccountController)

router.post('/account', [validateAccount], async (req: Request, res: Response) => accountController.createAccount(req, res))
router.post('/account/:account_id/send-email', [validateSendEmailParam, validateSendEmail, checkSendEmailLimit], async (req: Request, res: Response) => accountController.sendEmail(req, res))

router.get('/tracking/:h', [validateEmailHash], async (req: Request, res: Response) => accountController.trackEmail(req, res))


export default router
