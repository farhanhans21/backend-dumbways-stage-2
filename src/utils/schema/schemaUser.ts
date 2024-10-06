import Joi from "joi";

import { updateUserDTO } from "../../dto/user-dto";

export const updateUserSchema = Joi.object<updateUserDTO>({
  fullName: Joi.string().min(3).max(100),
  userName: Joi.string().min(3).max(100),
  bio: Joi.string().min(3).max(100)
});
