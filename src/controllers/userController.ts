import type { Request, Response } from 'express';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = (
      await UserModel.find({ _id: userId }).select('-password').exec()
    ).at(0);
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getUsersByChurch = async (req: Request, res: Response) => {
  const churchId = req.params.churchId;
  try {
    const users = await UserModel.find({ churchId }).select('-password').exec();
    res.status(200).json({
      status: 'success',
      amount: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const churchId = req.params.churchId;
    const password = req.body.password;
    let encryptedPassword = '';
    if (churchId === '0') {
      const salt = await bcrypt.genSalt(saltRounds);
      if (!salt) throw new Error('Error al encriptar password');
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw new Error('Error al encriptar password');
      encryptedPassword = hash;
    }
    const userInfo = {
      ...req.body,
      churchId,
      ...(churchId === '0' && { role: 'admin', password: encryptedPassword }),
    };
    await UserModel.create(userInfo);
    delete userInfo.password;
    res.status(201).json({
      status: 'success',
      data: { userInfo },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    await UserModel.updateOne({ _id: userId }, req.body);
    const user = (await UserModel.find({ _id: userId }).exec()).at(0);
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    await UserModel.deleteOne({ _id: userId });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  if (queryObj.name) queryObj.name = { $regex: queryObj.name, $options: 'i' };

  try {
    const query = UserModel.find(queryObj).select('-password').exec();
    const users = await query;
    res.status(200).json({
      status: 'success',
      amount: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
