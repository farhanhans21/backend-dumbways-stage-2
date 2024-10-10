import { Request, Response } from "express";
import { loginSchema,registerSchema } from "../utils/schema/schemaAuth";
import authService from "../services/authService";
class AuthController {
  async register(req: Request, res: Response){
    try {
      const value = await registerSchema.validateAsync(req.body)
      const user =  await authService.register(value);
      res.json(user);
    } catch (error) {
      console.error(error);
    }
  }
  async login(req: Request, res: Response){
    try {
      const value = await loginSchema.validateAsync(req.body);
      const user = await authService.login(value);
      res.json(user);
    } catch (error) {
      res.json(error)
    }
  }
  async checkLogin(req: Request, res: Response){
    const user = (req as any).user;
    res.json(user);
  }
}

export default new AuthController();