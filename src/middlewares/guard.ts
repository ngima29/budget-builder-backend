import {  UserInterface } from '../interfaces';
class Guard {
  private static instance: Guard;

  private constructor() {}

  static get(): Guard {
    if (!Guard.instance) {
      Guard.instance = new Guard();
    }
    return Guard.instance;
  }

  grant = (user: UserInterface | undefined): UserInterface => {
    if (!user) throw Error('Auth Failed');
    return user;
  };


}

const guard = Guard.get();

export { guard as Guard };
