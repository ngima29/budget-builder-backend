import { WhereOptions } from 'sequelize'
import { Attributes, IncludeOptions, Order } from 'sequelize/types/model'

interface RepositoryWriter<IT, RT> {
  create(input: Partial<IT>, include?: IncludeOptions): Promise<RT>
  bulkCreate(input: Partial<IT[]>): Promise<RT[]>
  updateOne({
    id,
    input,
    include,
  }: {
    id: number
    input: Partial<IT>
    include: IncludeOptions[]
  }): Promise<[number]>
  updateMany({
    where,
    input,
  }: {
    where: object
    input: Partial<IT>
  }): Promise<[number]>
  deleteOne(id: number): Promise<number>
  deleteMany({ where }: { where: object }): Promise<number>
  restore(id: number): Promise<number>
}

interface RepositoryReader<RT> {
  findAll({
    where,
    attributes,
    include,
    order,
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
  }): Promise<RT[]>
  findOne({
    where,
    attributes,
    include,
    order,
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
  }): Promise<RT>
  findByPk(
    id: number,
    options?: {
      attributes?: Attributes<any>
      include?: IncludeOptions[]
    }
  ): Promise<RT>
  findAndCountAll({
    where,
    attributes,
    include,
    order,
    offset,
    limit,
    distinct,
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
    offset?: number
    limit?: number
    distinct?: boolean
  }): Promise<{ count: number; rows: RT[] }>
  count({ where }: { where?: WhereOptions<any> }): Promise<number>;
  sum({ where }: { where?: WhereOptions<any> }, columnName: string): Promise<number>;
  
}

export abstract class BaseRepository<IT, RT>
  implements RepositoryWriter<IT, RT>, RepositoryReader<RT>
{
  constructor(public readonly model: any) {}

  findAll({
    where,
    attributes,
    include,
    order,
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
  }): Promise<RT[]> {
    return this.model.findAll({ where, attributes, include, order })
  }

  findOne({
    where,
    attributes,
    include,
    order,
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
  }): Promise<RT> {
    return this.model.findOne({ where, attributes, include, order })
  }

  findByPk(
    id: number,
    options?: {
      attributes?: Attributes<any>
      include?: IncludeOptions[]
    }
  ): Promise<RT> {
    return this.model.findByPk(id, options)
  }

  findAndCountAll({
    where,
    attributes,
    include,
    order,
    offset,
    limit,
    distinct,
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
    offset?: number
    limit?: number
    distinct?: boolean
  }): Promise<{ count: number; rows: RT[] }> {
    return this.model.findAndCountAll({
      where,
      attributes,
      include,
      order,
      offset,
      limit,
      distinct,
    })
  }
  count({ where }: { where?: WhereOptions<any> }): Promise<number> {
    return this.model.count({ where });
  }
  sum({ where }: { where?: WhereOptions<any> }, columnName: string): Promise<number> {
    return this.model.sum(columnName, { where });
  }
  
  create(input: Partial<IT>, include?: IncludeOptions): Promise<RT> {
    return this.model.create(input, include)
  }

  bulkCreate(input: Partial<IT[]>): Promise<RT[]> {
    return this.model.bulkCreate(input, { returning: true })
  }

  updateOne({
    id,
    input,
  }: {
    id: number
    input: Partial<IT>
  }): Promise<[number]> {
    return this.model.update(input, { where: { id } })
  }

  updateMany({
    where,
    input,
  }: {
    where: object
    input: Partial<IT>
  }): Promise<[number]> {
    return this.model.update(input, { where })
  }

  deleteOne(id: number): Promise<number> {
    return this.model.destroy({
      where: { id },
    })
  }

  deleteMany({ where }: { where: object }): Promise<number> {
    return this.model.destroy({
      where,
    })
  }

  restore(id: number): Promise<number> {
    return this.model.restore({
      where: { id },
    })
  }
}
