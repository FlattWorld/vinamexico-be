import type { Request, Response } from 'express';
import EventModel from '../models/eventModel';

export const getEventById = async (req: Request, res: Response) => {
  const id = req.params.eventId;
  try {
    const event = await EventModel.findById(id).exec();
    res.status(200).json({
      status: 'success',
      data: event,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = await EventModel.create({ ...req.body });
    res.status(201).json({
      status: 'success',
      data: { newEvent },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const editEvent = async (req: Request, res: Response) => {
  const id = req.params.eventId;
  try {
    await EventModel.findOneAndUpdate({ _id: id }, { ...req.body }).exec();
    // console.log({ post });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const addAttendant = async (req: Request, res: Response) => {
  const id = req.params.eventId;
  const newAttendants = req.body.attendants;
  try {
    const event = await EventModel.findById(id).exec();
    if (event === null) res.status(404).send();
    else {
      const eventAttendants = event.attendants;
      const update = { attendants: [...eventAttendants, newAttendants] };
      await EventModel.findOneAndUpdate({ _id: id }, update).exec();
    }
    // console.log({ post });
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await EventModel.findByIdAndDelete(id);
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

export const getAllEvents = async (req: Request, res: Response) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  if (queryObj.name) queryObj.name = { $regex: queryObj.name, $options: 'i' };

  try {
    const query = EventModel.find(queryObj);
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
