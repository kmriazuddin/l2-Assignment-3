import httpStatus from 'http-status';
import appError from '../../errors/appError';
import { MeetingRoom } from '../room/room.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

const createSlotIntoDB = async (
  room: string,
  date: string,
  startTime: string,
  endTime: string,
  slotDuration: number,
): Promise<TSlot[]> => {
  const isRoomExists = await MeetingRoom.findById(room);

  if (!isRoomExists) {
    throw new appError(httpStatus.NOT_FOUND, 'Room not found!');
  }

  const isRoomDeleted = isRoomExists?.isDeleted;
  if (isRoomDeleted) {
    throw new appError(httpStatus.NOT_FOUND, 'Room is deleted!');
  }

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;

  const numberOfSlots = totalDuration / slotDuration;

  const slots: TSlot[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * slotDuration;
    const slotEndMinutes = slotStartMinutes + slotDuration;

    const slotStartTime = minutesToTime(slotStartMinutes);
    const slotEndTime = minutesToTime(slotEndMinutes);

    const existingSlots = await Slot.find({
      room,
      date,
      $or: [
        { startTime: { $lt: slotEndTime }, endTime: { $gt: slotStartTime } },
        { startTime: { $gte: slotStartTime, $lt: slotEndTime } },
        { endTime: { $gt: slotStartTime, $lte: slotEndTime } },
      ],
    });

    if (existingSlots.length > 0) {
      throw new appError(
        httpStatus.BAD_REQUEST,
        'Now this slot is not available! Choose another time or day!',
      );
    }

    const slot = await Slot.create({
      room,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    });

    slots.push(slot);
  }

  return slots;
};

const getAllSlotFromDB = async (query: Record<string, unknown>) => {
  const { roomId, date } = query;

  const queryObject: Record<string, unknown> = {};
  if (date) {
    queryObject.date = date;
  }
  if (roomId) {
    queryObject.room = roomId;
  }

  const result = await Slot.find(queryObject).populate('room');
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotFromDB,
};
