
import { Context } from './Context'


class NycOpenDataError extends Error {

  isNycOpenDataError = true

  sdk = 'NycOpenData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  NycOpenDataError
}

