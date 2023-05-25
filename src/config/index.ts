import dotenv from 'dotenv'
import sequelize from 'sequelize'
import { EnvironmentEnum } from '../enums'

dotenv.config()

/**
 * Your favorite port
 */
export const port = parseInt(process.env.PORT!) as number,
  /**
   * Application name
   */
  appName = process.env.APP_NAME! as string,
  /**
   * Application mode (Set the environment to 'development' by default)
   */
  environment = process.env.ENVIRONMENT! as EnvironmentEnum,
  /**
   * Log Directive
   */
  logDir = process.env.LOG_DIR! as string,
  /**
   * Log Level
   */
  logLevel = process.env.LOG_LEVEL! as string,
  jwtSecret = process.env.JWT_SECRET,
  jwtAccessTokenExpiryTime = process.env.ACCESS_TOKEN_EXPIRY_TIME,
  /**
   * Database credentials
   */
  db = {
    username: process.env.DB_USER! as string,
    password: process.env.DB_PASSWORD! as string,
    name: process.env.DB_NAME! as string,
    host: process.env.DB_HOST! as string,
    dialect: process.env.DB_DIALECT! as sequelize.Dialect,
    port: parseInt(process.env.DB_PORT!) as number,
    logging: false,
    timezone: 'utc' as string,
  },
  /**
   * HOST URL
   */
  hostUrl = process.env.HOST_URL as string,
  headerUserKey = process.env.HEADER_USER_KEY as string,
  tokenExpireTime = 4,
  serviceName = process.env.SERVICE_NAME! as string,
  /**
   * Allowed Origins
   */
  corsWhitelist = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://188.166.246.240:3000',
    'http://188.166.246.240:3001',
    'https://admin.develop.mumegroup.com',
    hostUrl,
  ] as string[],
  kongBaseUrl = process.env.KONG_BASE_URL!,
  notificationBaseUrl = process.env.NOTIFICATION_BASE_URL as string;
