/* eslint-disable @typescript-eslint/explicit-function-return-type */

import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export function validate (req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}
