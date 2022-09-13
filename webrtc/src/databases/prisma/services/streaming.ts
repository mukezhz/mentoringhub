import * as prisma from "../init";
const { streaming } = prisma.default

export const create = async (data: any) => {
    try {
        return await streaming.create({
            data: data
        })
    } catch (e: any) {
        console.error(e, "[service]: error while creating streaming!!!")
        throw new Error("error while creating!!!")
    }
}

export const remove = async (id: string) => {
    try {
        return await streaming.delete({
            where: { id: id },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while removing streaming!!!")
        throw new Error('error while removing!!!')
    }
}

export const update = async (id: string, data: any) => {
    try {
        return await streaming.update({
            where: { id: id, },
            data: data,
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating streaming!!!")
        throw new Error('error while updating!!!')
    }
}

export const updateEndDate = async (id: string, endDate: number) => {
    try {
        return await streaming.update({
            where: { id: id, },
            data: { ended_at: endDate }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating streaming!!!")
        throw new Error('error while updating!!!')
    }
}

export const findByRoomName = async (room: string, email: string) => {
    try {
        return await streaming.findMany({
            where: { room_name: room, email: email },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding room name streaming!!!")
        throw new Error('error while updating!!!')
    }
}

export const findByEgress = async (egressId: string) => {
    try {
        return await streaming.findFirst({
            where: { egress_id: egressId },
            select: { id: true }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding by egress id streaming!!!")
        throw new Error('error while updating!!!')
    }
}
