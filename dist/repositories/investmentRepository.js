"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentRepository = void 0;
const models_1 = require("../models");
const baseRepository_1 = require("./baseRepository");
class InvestmentRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Investment);
    }
}
exports.InvestmentRepository = InvestmentRepository;
