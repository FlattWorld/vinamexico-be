import type {Request, Response} from 'express';
import ChurchModel from '../models/churchModel';

export const getChurchById = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  res.status(200).send('Hello World!');
}

export const createChurch = async (req: Request, res: Response) => {
  try {
    const newChurch = await ChurchModel.create({ ...req.body });
    res.status(201).json({
      status: 'success',
      data: { newChurch }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

export const editChurch = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  res.status(200).send('Hello World!');
}

export const deleteChurch = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  res.status(200).send('Hello World!');
}

export const getAllChurches = async (req: Request, res: Response) => {
  const queryObj = {...req.query};
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);
  if(queryObj.name) queryObj.name = {'$regex': queryObj.name, '$options': 'i'}

 try{
  const query =  ChurchModel.find(queryObj);
  const churches =  await query
  res.status(200).json({
    status: 'success',
    amount: churches.length,
    data: churches
  });
 } catch(err){
  res.status(400).json({
    status: 'fail',
    message: err
  });
 }
}