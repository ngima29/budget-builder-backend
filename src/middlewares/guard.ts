import {  UserInterface } from '../interfaces';
import { TokenGenerator} from '../utils'
import {UserService} from '../services'
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
    const {userId} = await TokenGenerator.verifyToken(token);
    const userExists = await new UserService().findOne({
      id:userId
    });
    if (!userExists) {
      throw Error('Auth Failed');
    }
    return userExists;
  };
  grant = (user: UserInterface | undefined): UserInterface => {
    if (!user) throw Error('Auth Failed');
    return user;
  };


}

const guard = Guard.get();

export { guard as Guard };
