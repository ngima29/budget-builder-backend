import * as Sequelize from 'sequelize';

export interface InputUserInterface {
  fullName: string;
  email: string;
  password: string;
  profilePic?: string;
}

export interface UserInterface {
  id: number
  fullName: string;
  email: string;
  password: string;
  profilePic: string;
}

export interface Login{
  email: string;
  password: string;
}

export interface ChangePassword{
  oldPassword: string;
  newPassword: string;
}

export interface InputForgetPassword{
  email: string;
}

export interface ForgetPassword{
  newPassword: string;
}
export interface UserModelInterface extends Sequelize.Model<Partial <UserInterface>, Partial<InputUserInterface>>,
UserInterface {}