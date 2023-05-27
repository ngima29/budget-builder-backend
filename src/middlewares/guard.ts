import {  UserInterface } from '../interfaces';
import { TokenGenerator} from '../utils'
class Guard {
  private static instance: Guard;

  private constructor() {}

  static get(): Guard {
    if (!Guard.instance) {
      Guard.instance = new Guard();
    }
    return Guard.instance;
  }
  auth = async (token: string): Promise<UserInterface> => {
    const verify = await TokenGenerator.verifyToken(token);
   
    if (!verify) {
      throw Error('Auth Failed');
    }

    return verify;
  };
  grant = (user: UserInterface | undefined): UserInterface => {
    if (!user) throw Error('Auth Failed');
    return user;
  };


}

const guard = Guard.get();

export { guard as Guard };
