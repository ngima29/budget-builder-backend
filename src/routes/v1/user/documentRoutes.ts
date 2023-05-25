import { RouterClass } from "../../../classes";
import { DocumentController } from "../../../controllers";
import { Validator } from "../../../middlewares";
import exceptionHandler from "../../../middlewares/exceptionHandler";
import { createOwnDocument } from "../../../validators";

export class DocumentRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route("/")
      .post(
        Validator.check(createOwnDocument),
        exceptionHandler(DocumentController.create)
      );

    this.router
      .route("/")
      .get(exceptionHandler(DocumentController.getOwn))
  }
}
