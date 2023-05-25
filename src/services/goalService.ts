import Boom from 'boom'
import * as Sequelize from 'sequelize'
import { Op, WhereOptions } from 'sequelize'
import {
    GoalInterface,
InputGoalInterface
} from '../interfaces'

import {GoalRepository} from '../repositories'



export class CategoryService {
  private repository: GoalRepository
  constructor() {
    this.repository = new GoalRepository()
  }

  async create(input: InputGoalInterface): Promise<GoalInterface> {
   
    const existingUser = await this.repository.findOne({
      where: {
       where:{ name: input.name },
      },
    })

    if (existingUser) {
        throw Boom.badRequest('Name is already taken')
    }

    const goal = await this.repository.create(input)
    return goal
  }


  async findByPk(
    id: number,
    options = { exclude: ['deletedAt'] }
  ): Promise<GoalInterface> {
    const goalExists = await this.repository.findByPk(id)

    if (!goalExists)
      throw Boom.notFound('Goal does not exist.', [
        { message: `Goal: ${id} does not exist!` },
      ])
    return goalExists;
  }

  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputGoalInterface
  ): Promise<GoalInterface> {
    if (id) {
      const userExists = await this.repository.findByPk(id)
      if (!userExists)
        throw Boom.notFound('Goal does not exist.', [
          { message: `Goal: ${id} does not exist!` },
        ])
    }


    await this.repository.updateOne({
      id: id,
      input: input,
    })

    return this.findByPk(id)
  }

  async deleteOne(id: number): Promise<boolean> {
    const roleExists = await this.repository.findByPk(id)
    if (!roleExists)
      throw Boom.notFound('Goal does not exist!', [
        { message: `Goal: ${id} does not exist!` },
      ])

    const remove = await this.repository.deleteOne(id)
    if (remove === 0)
      throw Boom.notFound('Goal does not exist!', [
        { message: `Goal: ${id} does not exist!` },
      ])
    return true
  }

 

  }

