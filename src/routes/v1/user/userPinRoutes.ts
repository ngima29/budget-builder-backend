import { RouterClass } from "../../../classes";
import { UserPinController } from "../../../controllers";
import { Validator } from "../../../middlewares";
import exceptionHandler from "../../../middlewares/exceptionHandler";
import { createPin, updatePin, verifyPin } from "../../../validators";

export class UserPinRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route("/")
      .post(
        Validator.check(createPin),
        exceptionHandler(UserPinController.create)
      );

      this.router
      .route("/")
      .put( Validator.check(updatePin), exceptionHandler(UserPinController.updateOne));

      this.router
      .route("/verify")
      .post(Validator.check(verifyPin), exceptionHandler(UserPinController.verifyPin));
  }
}
