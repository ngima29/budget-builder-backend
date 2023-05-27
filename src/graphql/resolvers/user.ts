import { InformationEvent } from 'http';
import {
  ContextInterface,
  InputUserInterface,
} from '../../interfaces';
import { Guard, Validator } from '../../middlewares';
import {
    signUp,
    login
} from '../../validators';
import {SuccessResponse} from "../../helpers"
 import {UserService} from "../../services"

export const userResolvers:any = { 
    Mutation: {
    createUser: async (
      parent: ParentNode,
      args: { input: InputUserInterface },
      contextValue: ContextInterface,
      info: InformationEvent,
    ) => {
        console.log("hello resolver");
        console.log(args.input)
      Validator.check(signUp, args.input);
      console.log("ok validate resolver");
      const data = await new UserService().create(args.input);

      return SuccessResponse.send({
        message: 'Attribute value is successfully created.',
        data: data,
      });
    },
    login: async (
        parent: ParentNode,
        args: { input: InputUserInterface },
        contextValue: ContextInterface,
        info: InformationEvent,
      ) => {
          console.log(args.input)
        Validator.check(login, args.input);
        console.log("ok validate resolver");
        const data = await new UserService().login(args.input);
  
        return SuccessResponse.send({
          message: 'Attribute value is successfully created.',
          data: data,
        });
      }
},
Query: {}
}