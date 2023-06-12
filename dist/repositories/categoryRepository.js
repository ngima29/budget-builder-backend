"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const models_1 = require("../models");
const baseRepository_1 = require("./baseRepository");
class CategoryRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Category);
    }
}
exports.CategoryRepository = CategoryRepository;
