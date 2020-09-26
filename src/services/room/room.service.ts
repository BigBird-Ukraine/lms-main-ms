import { model } from 'mongoose';

import { DatabaseTablesEnum } from '../../constants/enums';
import { Room, RoomSchema, RoomType, SettingRoomScheme, SettingRoomType } from '../../database/models';
import { IBookUser, IRoom, ISettingRoom } from '../../interfaces';

class RoomService {

    createRoom(room: IRoom): Promise<any> {
        const newRoom = new Room(room);

        return newRoom.save();
    }

    async findRooms(filter?: any, params?: any, populate?: any): Promise<IRoom[]> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        return RoomModel.find(filter)
            .populate(populate)
            .select(params) as any;
    }

    updateRoom(room_id: string, room: Partial<IRoom>): Promise<IRoom> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        return RoomModel.findByIdAndUpdate(room_id, room, {new: true}) as any;
    }

    async deleteRoom(room_id: string): Promise<void> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        await RoomModel.findByIdAndDelete(room_id);
    }

    async bookTable(tableBookData: IBookUser, room_id: string): Promise<void> {
        const RoomModel = model<RoomType>(DatabaseTablesEnum.ROOM_COLLECTION_NAME, RoomSchema);

        await RoomModel.findByIdAndUpdate(room_id, {$push: {booked_users: tableBookData}});
    }

    findSettingRooms(filter?: any, select?: any): Promise<ISettingRoom[]> {
        const SettingRoomModel = model<SettingRoomType>(DatabaseTablesEnum.SETTING_ROOM_COLLECTION_NAME, SettingRoomScheme);

        return SettingRoomModel.find(filter).select(select) as any;
    }
}

export const roomService = new RoomService();