import { PrismaClient, Users } from "@prisma/client";
import { LoginDTO, RegisterDTO } from "../dto/auth-dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();

class AuthService {
  async register(
    data: RegisterDTO
  ): Promise<{ user: Omit<Users, "password">; token: string }> {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const userName = data.email.split("@")[0];

    const user = await prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
        userName: userName,
      },
    });
    const { password, ...userToSign } = user;
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    return {
      user: userToSign,
      token,
    };
  }

  async  login(
    data: LoginDTO
  ): Promise<{ user: Omit<Users, "password">; token: string }> {
    const user = await prisma.users.findFirst({
      where: { OR:[
        {email:data.userName},
        {userName:data.userName}
      ]

      },
    });

    if (!user) {
      throw new CustomError("Email not found", 404);
    }
    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new CustomError("Invalid password", 401);
    }
    const { password, ...userToSign } = user;
    const secretKey = process.env.JWT_SECRET as string;
    const token = jwt.sign(userToSign, secretKey);

    return { user: userToSign, token: token };
  }
}

export default new AuthService();
