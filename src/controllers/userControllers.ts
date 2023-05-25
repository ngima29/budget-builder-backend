import { Request, Response } from 'express'
import { RoleEnum } from '../enums'
import { UserService } from '../services'
import { successResponseData } from '../utils'

export class UserController {
  constructor() {}

  static async list(req: Request, res: Response): Promise<void> {
    const data = await new UserService().findAll({ role: RoleEnum.ADMIN })
    return successResponseData({ data, message: 'All users are fetched', res })
  }

  static async get(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)
    const data = await new UserService().findByPk(id)
    return successResponseData({ data, message: 'User data is fetched.', res })
  }

  static async create(req: Request, res: Response): Promise<void> {
    const data = await new UserService().create({
      ...req.body,
      roles: [RoleEnum.ADMIN],
    })
    return successResponseData({ data, message: 'User data is created.', res })
  }

  static async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id)
    const userData = req.body
    const data = await new UserService().updateOne(id, {
      ...userData,
      roles: [RoleEnum.ADMIN],
    })
    return successResponseData({ data, message: 'User data is updated.', res })
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10)
    await new UserService().deleteOne(id)
    return successResponseData({ message: 'User data is updated.', res })
  }
}
