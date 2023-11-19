import type { Request, Response } from 'express';
import PostModel from '../models/postModel';

export const getPostById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const post = await PostModel.findById(id).exec();
    res.status(200).json({
      status: 'success',
      data: { post },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const date = new Date();
  try {
    const newPost = await PostModel.create({ ...req.body, date });
    res.status(201).json({
      status: 'success',
      data: { newPost },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const editPost = async (req: Request, res: Response) => {
  // const id = Number(req.params.id)
  res.status(200).send('Hello World!');
};

export const deletePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await PostModel.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      data: { id },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  if (queryObj.name) queryObj.name = { $regex: queryObj.name, $options: 'i' };

  try {
    const query = PostModel.find(queryObj);
    const posts = await query;
    res.status(200).json({
      status: 'success',
      amount: posts.length,
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
