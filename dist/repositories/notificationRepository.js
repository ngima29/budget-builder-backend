"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const models_1 = require("../models");
const baseRepository_1 = require("./baseRepository");
class NotificationRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(models_1.Notification);
    }
}
exports.NotificationRepository = NotificationRepository;
