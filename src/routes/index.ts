import { Request, Response, Router } from 'express'

import v1 from './v1'

const router = Router()

router.use(`/v1/api`, v1)

router.get('/ping', (req: Request, res: Response) => {
  res.send('OK')
})


export default router
