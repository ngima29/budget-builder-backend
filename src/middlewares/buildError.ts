import {
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize'
import { HttpStatusEnum, ReasonPhrasesEnum } from '../enums'

/**
 * Build error response for validation errors.
 */
function buildError(err: any) {
  // Validation errors
  if (err.isJoi) {
    return {
      success: false,
      code: HttpStatusEnum.BAD_REQUEST,
      message:  ReasonPhrasesEnum.BAD_REQUEST || err ,
      details:
        err.details &&
        err.details.map((err: any) => {
          return {
            message: err.message || err,
            param: err.path.join('.'),
          }
        }),
    }
  }

  // Boom errors
  else if (err.isBoom) {
    return {
      success: false,
      code: err.output.statusCode,
      message: err.message || err.output.payload.message,
        details: err?.data?.map((err: any) => {
          return {
            message: err.message || err.output.payload.message,
            param: err.path?.join('.'),
          }
        }) || [{
            message: err.message || err.output.payload.message,
            param: err.path?.join('.') || '',
        }]
    }
  } else if (err.constructor.name === 'FirebaseAuthError') {
    return {
      success: false,
      code: HttpStatusEnum.UNAUTHORIZED,
      message: 'Invalid access token',
      ...(err.data && {
        details: err.data.map((err: any) => {
          return {
            message: 'Invalid access token',
            param: err.path.join('.'),
          }
        }),
      }),
    }
  }
  // Sequelize errors
  else if (err instanceof UniqueConstraintError) {
    return {
      success: false,
      code: HttpStatusEnum.CONFLICT,
      message: ReasonPhrasesEnum.CONFLICT,
      details: [
        {
          message: err.message,
        },
      ],
    }
  } else if (err instanceof ForeignKeyConstraintError) {
    return {
      success: false,
      code: HttpStatusEnum.CONFLICT,
      message: ReasonPhrasesEnum.CONFLICT,
      details: [
        {
          message: err.message,
        },
      ],
    }
  } else if (err instanceof ValidationError) {
    return {
      success: false,
      code: HttpStatusEnum.BAD_REQUEST,
      message: ReasonPhrasesEnum.BAD_REQUEST,
      details: err.errors.map((item) => {
        return {
          message: item.message,
          path: item.path,
        }
      }),
    }
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  else {
    return {
      success: false,
      code: HttpStatusEnum.INTERNAL_SERVER_ERROR,
      message: ReasonPhrasesEnum.INTERNAL_SERVER_ERROR,
    }
  }
}

export default buildError
