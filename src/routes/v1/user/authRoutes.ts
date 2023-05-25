import { RouterClass } from '../../../classes'
import { AuthController } from '../../../controllers'
import { Validator } from '../../../middlewares'
import exceptionHandler from '../../../middlewares/exceptionHandler'
import {
  changePassword,
  forgotPassword,
  sendOtp,
  updateMe,
  verifyOtp,
} from '../../../validators'
export class AuthRouter extends RouterClass {
  constructor() {
    super()
  }

  define(): void {
    this.router
      .route('/me')
      .get(exceptionHandler(AuthController.me))
      .patch(
        Validator.check(updateMe),
        exceptionHandler(AuthController.updateMe)
      )

    this.router
      .route('/change-password')
      .post(
        Validator.check(changePassword),
        exceptionHandler(AuthController.changePassword)
      )

    this.router
      .route('/send-otp/:type')
      .post(Validator.check(sendOtp), exceptionHandler(AuthController.sendOtp))

    this.router
      .route('/verify-otp/:type')
      .post(
        Validator.check(verifyOtp),
        exceptionHandler(AuthController.verifyOtp)
      )
  }
}
