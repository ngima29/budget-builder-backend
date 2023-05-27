import * as Sequelize from 'sequelize'
import {
  InputUserInterface,
  UserInterface,
  Login
} from '../interfaces'

import {UserRepository} from '../repositories'
import { Password, TokenGenerator } from '../utils'
import { string } from 'joi'
import { error } from 'console'


export class UserService {
  private repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }

  async create(input: InputUserInterface): Promise<UserInterface> {
    console.log("hello service");
    const existingUser = await this.repository.findOne({ 
      where:{ email: input.email },
    })
    console.log(existingUser)

   if (existingUser) throw new Error(` Email  : ${input.email} already exist!`);
  if(input.password){
    input.password =  await Password.generate(input.password)
  }
    const user = await this.repository.create(input)
    return user;
  }


  // async findByPk(
  //   id: number,
  //   options = { exclude: ['deletedAt'] }
  // ): Promise<UserInterface> {
  //   const userExists = await this.repository.findByPk(id)

  //   if (!userExists)
  //   console.log('sorry');
  //     ])
  //   return userExists
  // }

  // async updateOne(
  //   id: Sequelize.CreationOptional<number>,
  //   input: InputUserInterface
  // ): Promise<UserInterface> {
  //   if (id) {
  //     const userExists = await this.repository.findByPk(id)
  //     if (!userExists)
  //       throw Boom.notFound('User does not exist.', [
  //         { message: `User: ${id} does not exist!` },
  //       ])
  //   }

  //   if (input.email) {
  //     const emailExists = await this.repository.findOne({
  //       where: { email: input.email?.trim() },
  //     })
  //     if (emailExists && emailExists.id !== id)
  //       throw Boom.notFound('Email not found.', [
  //         { message: `Email: ${input.email} is already exists!` },
  //       ])
  //   }

  //   await this.repository.updateOne({
  //     id: id,
  //     input: input,
  //   })

  //   return this.findByPk(id)
  // }

  // async deleteOne(id: number): Promise<boolean> {
  //   const roleExists = await this.repository.findByPk(id)
  //   if (!roleExists)
  //     throw Boom.notFound('User does not exist!', [
  //       { message: `User: ${id} does not exist!` },
  //     ])

  //   const remove = await this.repository.deleteOne(id)
  //   if (remove === 0)
  //     throw Boom.notFound('User does not exist!', [
  //       { message: `User: ${id} does not exist!` },
  //     ])
  //   return true
  // }

  async login(input: Login): Promise<any> {
    const user = await this.repository.findOne({
        where:  { email: input.email }
      })

    if (!user)   throw  new Error('Invalid Identifier or Password');
    

     const validatePassword = await Password.validatePassword(input.password, user.password)

     if (!validatePassword)   throw new Error('Invalid Identifier or Password')
     if (user && validatePassword){
       const userId = user.id
       const token = await TokenGenerator.generateToken({userId}, 86400)
       return {
        user,
        token}
     }
   
  }
}
