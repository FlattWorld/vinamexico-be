const bcrypt = require("bcrypt");

import type { Request, Response } from "express";
import UserModel from "../models/userModel";

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = (await UserModel.find({ name: userName }).exec()).at(0);
    if (!user || !user?.password) throw new Error("No se encontró usuario");
    const result = await bcrypt.compare(password, user.password);
    console.log({ result })
    if (!result) throw new Error("Password incorrecto");

    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({
      status: "success",
      data: { userObject },
    });
  } catch (err:any) {
    console.log({ err})
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
