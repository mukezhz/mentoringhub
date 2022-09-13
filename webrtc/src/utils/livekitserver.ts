import { TrackInfo, RoomServiceClient, Room, ParticipantInfo, DataPacket_Kind, ParticipantPermission } from 'livekit-server-sdk';


export function roomService(livekitHost: string, apiKey: string, apiSecret: string): RoomServiceClient | undefined {
    try {
        const svc = new RoomServiceClient(livekitHost, apiKey, apiSecret);
        return svc
    } catch (e) {
        console.error(e)
        console.error("room service creation error!!!");
    }
}
/* **************************************
***********    ROOM     *****************
*****************************************/
export async function createRoom(svc: RoomServiceClient, roomName: string, timeout = 5, participantno = 100): Promise<Room | boolean> {
    const opts = {
        name: roomName,
        emptyTimeout: timeout,
        maxParticipants: participantno
    }
    try {
        return await svc.createRoom(opts);
    } catch (e) {
        console.error(e)
        console.error("room creation error");
        return false
    }
}

export async function deleteRoom(svc: RoomServiceClient, roomName: string): Promise<boolean> {
    try {
        await svc.deleteRoom(roomName)
        return true
    } catch (e) {
        console.error(e)
        console.error("error while deleting room!!!")
        return false
    }
}

export async function listRooms(svc: RoomServiceClient, names?: string[]): Promise<Room[] | false> {
    try {
        // if names = undefined|'' returns all rooms
        return await svc.listRooms(names)
    } catch (e) {
        console.error(e)
        console.error("error while listing the rooms!!!")
        return false
    }
}
export async function updateRoomMetadata(svc: RoomServiceClient, room: string, metadata: string): Promise<Room | undefined> {
    try {
        return svc.updateRoomMetadata(room, metadata)
    } catch (e) {
        console.error(e)
        console.error('error while updating room metadata!!!')
    }
}

/*****************************************
********** PARTICIPANT********************
******************************************/

export async function getParticipant(svc: RoomServiceClient, room: string, identity: string): Promise<ParticipantInfo | undefined> {
    try {
        return await svc.getParticipant(room, identity)
    } catch (e) {
        console.error(e)
        console.error('error while fetching participant!!!')
    }
}

export async function listParticipants(svc: RoomServiceClient, room: string): Promise<ParticipantInfo[] | undefined> {
    try {
        const participants = await svc.listParticipants(room)
        return participants
    } catch (e) {
        console.error(e)
        console.error('error while listing participants!!!')
    }
}

export async function mutePublishedTrack(svc: RoomServiceClient, room: string, identity: string, trackSid: string, muted: boolean): Promise<TrackInfo | undefined> {
    try {
        return await svc.mutePublishedTrack(room, identity, trackSid, muted)
    } catch (e) {
        console.error(e)
        console.error('error while muting publish track!!!')
    }
}

export async function removeParticipant(svc: RoomServiceClient, room: string, identity: string): Promise<void | boolean> {
    try {
        await svc.removeParticipant(room, identity)
        return true
    } catch (e) {
        console.error(e)
        console.error('error while removing participant!!!', identity)
        return false
    }
}

export async function sendData(svc: RoomServiceClient, room: string, data: Uint8Array, kind: DataPacket_Kind, destinationSids?: string[]): Promise<void | boolean> {
    try {
        return await svc.sendData(room, data, kind)
    } catch (e) {
        console.error(e)
        console.error('error while sending the data!!!')
        return false
    }
}

export async function updateSubscriptions(svc: RoomServiceClient, room: string, identity: string, trackSids: string[], subscribe: boolean): Promise<void | boolean> {
    try {
        await svc.updateSubscriptions(room, identity, trackSids, subscribe)
        return true
    } catch (e) {
        console.error(e)
        console.error("error while updating subscriptions!!!")
        return false
    }
}

export async function updateParticipant(svc: RoomServiceClient, room: string, identity: string, metadata?: string, permission?: ParticipantPermission): Promise<ParticipantInfo | boolean> {
    try {
        return svc.updateParticipant(room, identity, metadata, permission)
    } catch (e) {
        console.error(e)
        console.error('error while updating participant metadata or permissions')
        return false
    }
}