import Boom from 'boom'
import * as Sequelize from 'sequelize'
import { Op, WhereOptions } from 'sequelize'
import {
    InvestmentInterface,
   InputInvestmentInterface
} from '../interfaces'

import {InvestmentRepository} from '../repositories'



export class InvestmentService {
  private repository: InvestmentRepository
  constructor() {
    this.repository = new InvestmentRepository()
  }

  async create(input: InputInvestmentInterface): Promise<InvestmentInterface> {
   
    const existingInvestment = await this.repository.findOne({
      where: {
       where:{ name: input.name },
      },
    })

    if (existingInvestment) {
        throw Boom.badRequest('Name is already taken');
    }

    const investment = await this.repository.create(input);
    return investment;
  }


  async findByPk(
    id: number,
    options = { exclude: ['deletedAt'] }
  ): Promise<InvestmentInterface> {
    const investmentExists = await this.repository.findByPk(id)

    if (!investmentExists)
      throw Boom.notFound('Investment does not exist.', [
        { message: `Investment: ${id} does not exist!` },
      ])
    return investmentExists;
  }

  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputInvestmentInterface
  ): Promise<InvestmentInterface> {
    if (id) {
      const investmentExists = await this.repository.findByPk(id)
      if (!investmentExists)
        throw Boom.notFound('Investment does not exist.', [
          { message: `Investment: ${id} does not exist!` },
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
      throw Boom.notFound('Investment does not exist!', [
        { message: `Investment: ${id} does not exist!` },
      ])

    const remove = await this.repository.deleteOne(id)
    if (remove === 0)
      throw Boom.notFound('Investment does not exist!', [
        { message: `Investment: ${id} does not exist!` },
      ])
    return true
  }

  }

