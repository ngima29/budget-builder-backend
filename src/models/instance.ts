import sequelize from 'sequelize'
import { db, environment } from '../config'
import { EnvironmentEnum } from '../enums'
import logger from '../utils/logger'

class Database {
  public sequelize: sequelize.Sequelize
  private static instance: Database
  private dialect: sequelize.Dialect
  private dbname: string
  private username: string
  private password: string
  private host: string
  private port: number
  private maxPool: number
  private minPool: number

  private constructor() {
    this.dialect = db.dialect
    this.dbname = db.name
    this.username = db.username
    this.password = db.password
    this.host = db.host
    this.port = db.port
    this.maxPool = 10
    this.minPool = 1

    this.sequelize = new sequelize.Sequelize(
      this.dbname,
      this.username,
      this.password,
      {
        host: this.host,
        dialect: this.dialect,
        dialectOptions: {
          encrypt: true,
        },
        port: this.port,
        logging: false,
        timezone: 'utc',
        pool: {
          max: this.maxPool,
          min: this.minPool,
          acquire: 30000,
          idle: 10000,
        },
      }
    )
  }

  static get(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  async connection() {
    const isDevelopment: boolean = environment === EnvironmentEnum.development
    try {
      await this.sequelize.authenticate()
      await this.sequelize.sync({
        force: false,
        alter: false,
      })

      logger.info(`${db.dialect.toUpperCase()} database connected`)
    } catch (error: any) {
    logger.error(error.message)
    }
  }
}

const database = Database.get()

export { database as Database }
