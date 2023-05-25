import { InputFinanceInterface, FinanceInterface } from "../interfaces";
import { Finance } from "../models";
import { BaseRepository } from "./baseRepository";

export class FinanceRepository extends BaseRepository<
InputFinanceInterface,
FinanceInterface> {
  constructor() {
    super(Finance);
  }
}
