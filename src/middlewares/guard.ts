import { InputUserInterface, UserInterface } from '../interfaces';
import { UserService } from '../services';


class Guard {
  private static instance: Guard;

  private constructor() {}

  static get(): Guard {
    if (!Guard.instance) {
      Guard.instance = new Guard();
    }
    return Guard.instance;
  }

  auth = async (token: string, workspace: WorkspaceInterface | undefined): Promise<UserInterface> => {
    const verify = await AwsCognito.verifyToken(token);
    const userExists = await new UserService().findOne({
      sub: verify.sub,
      workspace_id: workspace?.id,
    });
    if (!userExists) {
      throw Error('Auth Failed');
    }
    if (!userExists.email_verified || !userExists.phone_number_verified) {
      return this.verifyUser(userExists.id, token);
    }
    return userExists;
  };

  registerUser = async (token: string, verify: CognitoAccessTokenPayload): Promise<UserInterface> => {
    const cognitoUser = await AwsCognito.getCognitoUser(token);
    if (!cognitoUser) throw Error('Auth Failed');
    const input = this.formatCognitoUser({ cognitoUser: cognitoUser, verify: verify });
    return new UserService().create(input);
  };


  grant = (user: UserInterface | undefined): UserInterface => {
    if (!user) throw Error('Auth Failed');
    return user;
  };


 
}

const guard = Guard.get();

export { guard as Guard };
