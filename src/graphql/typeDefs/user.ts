import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';

export const userDefs: DocumentNode = gql`
#graphql

 enum Gender {
   male
   female
   other
   }
input InputUserSignUp {
    full_name: String!
    gender: Gender!
    email: String!
    password: String!
}

 type User {
    id: Int
    full_name: String
    gender: Gender
    email: String
    createdAt: Date
    updatedAt: Date
}
input Login {
    email:String!
    password:String!
}

input ForgetPassword {
    email: String!
}
 input ChangePassword {
   old_password: String!
   new_password: String!
 }
 
 type SingleUser {
  message: String
  data: User
 }

type Message {
 message: String
}
extend type Mutation {
 createUser(input: InputUserSignUp!): SingleUser
 updateUser(id:Int!, input: InputUserSignUp!):SingleUser
 deleteUser(id:Int!):Message
 login(input: Login): SingleUser
 forgetPassword(input: ForgetPassword): Message
 changePassword(Input: ChangePassword): Message
}

extend type Query {
    user(id:Int!): SingleUser
}

`;