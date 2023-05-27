// import Boom from 'boom'
// import * as Sequelize from 'sequelize'
// import { Op, WhereOptions } from 'sequelize'
// import {
//     LoanInterface,
//    InputLoanInterface
// } from '../interfaces'

// import {LoanRepository} from '../repositories'



// export class LoanService {
//   private repository: LoanRepository
//   constructor() {
//     this.repository = new LoanRepository()
//   }

//   async create(input: InputLoanInterface): Promise<LoanInterface> {
   
//     const existingDescription = await this.repository.findOne({
//       where: {
//        where:{ description: input.description },
//       },
//     })

//     if (existingDescription) {
//         throw Boom.badRequest('Description is already exist');
//     }

//     const loan = await this.repository.create(input);
//     return loan;
//   }


//   async findByPk(
//     id: number,
//     options = { exclude: ['deletedAt'] }
//   ): Promise<LoanInterface> {
//     const loanExists = await this.repository.findByPk(id)

//     if (!loanExists)
//       throw Boom.notFound('Loan does not exist.', [
//         { message: `Loan: ${id} does not exist!` },
//       ])
//     return loanExists;
//   }

//   async updateOne(
//     id: Sequelize.CreationOptional<number>,
//     input: InputLoanInterface
//   ): Promise<LoanInterface> {
//     if (id) {
//       const loanExists = await this.repository.findByPk(id)
//       if (!loanExists)
//         throw Boom.notFound('Loan does not exist.', [
//           { message: `Loan: ${id} does not exist!` },
//         ])
//     }


//     await this.repository.updateOne({
//       id: id,
//       input: input,
//     })

//     return this.findByPk(id)
//   }

//   async deleteOne(id: number): Promise<boolean> {
//     const roleExists = await this.repository.findByPk(id)
//     if (!roleExists)
//       throw Boom.notFound('Loan does not exist!', [
//         { message: `Loan: ${id} does not exist!` },
//       ])

//     const remove = await this.repository.deleteOne(id)
//     if (remove === 0)
//       throw Boom.notFound('Loan does not exist!', [
//         { message: `Loan: ${id} does not exist!` },
//       ])
//     return true;
//   }

//   }

