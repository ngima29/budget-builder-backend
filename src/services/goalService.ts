import * as Sequelize from 'sequelize';
import { Op, WhereOptions } from 'sequelize';
import slug from 'slug';
import { SequlizeQueryGenerator } from '../helpers';
import {
 ArgsGoalInterface,
 InputGoalInterface,
 GoalInterface
} from '../interfaces'

import {GoalRepository} from '../repositories'

export class GoalService {
  private repository: GoalRepository
  constructor() {
    this.repository = new GoalRepository()
  }

  async create(input: InputGoalInterface): Promise<GoalInterface> {
    const goalSlug = slug(input.name);
    const existingGoal = await this.repository.findOne({
       where:{ slug: goalSlug, type:input.type}
    })
    if (existingGoal)  throw new Error(`goal name already Exist`);
    input.slug = goalSlug;
    const goal = await this.repository.create(input);
    return await this.repository.findByPk(goal.id);
  }


  async findByPk(
    id: number,
    options = { exclude: ['deletedAt'] }
  ): Promise<GoalInterface> {
    const goalExists = await this.repository.findByPk(id)
    if (!goalExists)  throw new Error(`goal ${id} does not exist`);
    const currentDate = new Date();
    const progressPercentage = (goalExists.currentAmount / goalExists.totalAmount) * 100;
    const goalEndDate = new Date(goalExists.endDate); // Convert endDate to a Date object without time
    goalEndDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
    const remainingDays = Math.ceil(
      (goalEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      ...goalExists,
      progressPercentage,
      remainingDays,
    };
  }

  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputGoalInterface
  ): Promise<GoalInterface> {
      const goalExists = await this.repository.findByPk(id)
      if (!goalExists)  throw new Error(`goal ${id} does not exist`);
      if(input.name){
        const goalSlug = slug(input.name.toString());
        const existingGoal = await this.repository.findOne({
          where:{ slug:goalSlug, type:input.type },
        })
        if(existingGoal) throw new Error(`goal Name: ${input.name} is already exist`);
        input.slug = goalSlug;
      }
    await this.repository.updateOne({
      id: id,
      input: input,
    })

    return this.findByPk(id)
  }

  async deleteOne(id: number): Promise<boolean> {
    const goalExists = await this.repository.findByPk(id);
    if (!goalExists) throw new Error(`goal: ${id} does not exist!`);

    const remove = await this.repository.deleteOne(id);
    if (remove === 0) throw new Error(`goal: ${id} does not exist!`);
    return true;
  }

  findAndCountAll({ offset, limit, query, sort, order, type  }: ArgsGoalInterface): Promise<{
    count: number;
    rows: GoalInterface[];
  }> {
    let where: WhereOptions<any> = {};
    if (query) {
      where = {
        ...where,
        [Sequelize.Op.or]: SequlizeQueryGenerator.searchRegex({
          query,
          columns: ['name','type'],
        }),
      };
    }
    if(type) {
        where = { ...where, type:type };
      }
    return this.repository.findAndCountAll({
      where,
      offset,
      limit,
      order: [[order, sort]],
      distinct: true,
    });
  }
  }

