"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanRepository = void 0;
const models_1 = require("../models");
const baseRepository_1 = require("./baseRepository");
class LoanRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Loan);
    }
}
exports.LoanRepository = LoanRepository;
