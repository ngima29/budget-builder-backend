"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    findAll({ where, attributes, include, order, }) {
        return this.model.findAll({ where, attributes, include, order });
    }
    findOne({ where, attributes, include, order, }) {
        return this.model.findOne({ where, attributes, include, order });
    }
    findByPk(id, options) {
        return this.model.findByPk(id, options);
    }
    findAndCountAll({ where, attributes, include, order, offset, limit, distinct, }) {
        return this.model.findAndCountAll({
            where,
            attributes,
            include,
            order,
            offset,
            limit,
            distinct,
        });
    }
    create(input, include) {
        return this.model.create(input, include);
    }
    bulkCreate(input) {
        return this.model.bulkCreate(input, { returning: true });
    }
    updateOne({ id, input, }) {
        return this.model.update(input, { where: { id } });
    }
    updateMany({ where, input, }) {
        return this.model.update(input, { where });
    }
    deleteOne(id) {
        return this.model.destroy({
            where: { id },
        });
    }
    deleteMany({ where }) {
        return this.model.destroy({
            where,
        });
    }
    restore(id) {
        return this.model.restore({
            where: { id },
        });
    }
}
exports.BaseRepository = BaseRepository;
