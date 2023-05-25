import { RouterClass } from '../../../classes'
import { CustomerController } from '../../../controllers'
import exceptionHandler from '../../../middlewares/exceptionHandler'

export class CustomerRouter extends RouterClass {
  constructor() {
    super()
  }

  define(): void {
    this.router.route('/').get(exceptionHandler(CustomerController.list))
  }
}
