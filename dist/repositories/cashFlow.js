"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashFlowRepository = void 0;
const models_1 = require("../models");
const baseRepository_1 = require("./baseRepository");
class CashFlowRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(models_1.CashFlow);
    }
}
exports.CashFlowRepository = CashFlowRepository;
