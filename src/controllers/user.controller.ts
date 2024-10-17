import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { hashPassword, verifyPassword } from "../utils/hash";
import { validateFields } from "../utils/validate";
import prisma from "../prisma";

const createAccount = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const emptyFields = validateFields(req.body);
  if (emptyFields.isError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: emptyFields.errorFields });

    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(StatusCodes.ACCEPTED).json({ message: "User already exists" });

      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { name: true, email: true, role: true },
    });

    res
      .status(StatusCodes.OK)
      .json({ message: "User created successfully", data: newUser });
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "An error occurred" });
  }
};

const loginAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const emptyFields = validateFields(req.body);

    if (emptyFields.isError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: emptyFields.errorFields });
      return;
    }

    const currUser = await prisma.user.findUnique({ where: { email } });

    if (!currUser) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
      return;
    }

    const isMatchedPassword = verifyPassword(currUser.password, password);

    if (!isMatchedPassword) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password mismatch" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { name: true, email: true, role: true },
    });

    res
      .status(StatusCodes.OK)
      .json({ message: "Login successfully", data: user });
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export { createAccount, loginAccount };
