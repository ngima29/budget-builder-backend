import Boom from 'boom'
import * as Sequelize from 'sequelize'
import { Op, WhereOptions } from 'sequelize'
import {
  Login,
  InputUserInterface,
  UserCredentialInterface,
  UserInterface,
} from '../interfaces'

import {UserRepository} from '../repositories'
import { Password } from '../utils'


export class UserService {
  private repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }

  async create(input: InputUserInterface): Promise<any> {
   
    const existingUser = await this.repository.findOne({
      where: {
       where:{ email: input.email },
      },
    })

    if (existingUser) {
        throw Boom.badRequest('Email is already taken')
    }

    const { hash, salt } = Password.generate(input.password)

    const credentials = [
      {
        hash,
        salt,
      },
    ] as UserCredentialInterface[]
    const user = await this.repository.create(input)
  }


  async findByPk(
    id: number,
    options = { exclude: ['deletedAt'] }
  ): Promise<UserInterface> {
    const userExists = await this.repository.findByPk(id)

    if (!userExists)
      throw Boom.notFound('Customer does not exist.', [
        { message: `Customer: ${id} does not exist!` },
      ])
    return userExists
  }

  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputUserInterface
  ): Promise<UserInterface> {
    if (id) {
      const userExists = await this.repository.findByPk(id)
      if (!userExists)
        throw Boom.notFound('User does not exist.', [
          { message: `User: ${id} does not exist!` },
        ])
    }

    if (input.email) {
      const emailExists = await this.repository.findOne({
        where: { email: input.email?.trim() },
      })
      if (emailExists && emailExists.id !== id)
        throw Boom.notFound('Email not found.', [
          { message: `Email: ${input.email} is already exists!` },
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
      throw Boom.notFound('User does not exist!', [
        { message: `User: ${id} does not exist!` },
      ])

    const remove = await this.repository.deleteOne(id)
    if (remove === 0)
      throw Boom.notFound('User does not exist!', [
        { message: `User: ${id} does not exist!` },
      ])
    return true
  }

  async login(input: Login): Promise<UserInterface> {
    const user = await this.repository.findOne({
      where: {
        where:  { email: input.email },
      },
      })

    if (!user) {
      throw Boom.unauthorized('Invalid Identifier or Password')
    }

    // const userPassword = await this.userCredentialRepository.findOne({
    //   where: { userId: user.id },
    // })

    // const validatePassword = Password.validate({
    //   password: input.password,
    //   // hash: userPassword.hash,
    //   // salt: userPassword.salt,
    // })

    // if (!validatePassword) {
    //   throw Boom.unauthorized('Invalid Identifier or Password')
    // }

    return user
  }
}
