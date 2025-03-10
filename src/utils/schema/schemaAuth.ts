import Joi from "joi";

import { LoginDTO,RegisterDTO } from "../../dto/auth-dto";

export const registerSchema = Joi.object<RegisterDTO>({
  fullName: Joi.string().min(5).max(500).required(),
  email: Joi.string().email(),
  password: Joi.string().min(6)
})

export const loginSchema = Joi.object<LoginDTO>({
  userName: Joi.string(),
  password: Joi.string()
})