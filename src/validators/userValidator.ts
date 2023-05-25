import Joi from "joi";


const createUser = Joi.object({
  fullName: Joi.string().required().label("Full Name"),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label("Email"),
  password: Joi.string().required().label("Password"),
  
});



const updateUser = Joi.object({
  fullName: Joi.string().required().label("Full Name"),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label("Email"),
  password: Joi.string().required().label("Password"),
});



export { createUser, updateUser };
