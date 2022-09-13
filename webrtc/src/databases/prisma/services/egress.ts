import * as prisma from "../init";
const { egress } = prisma.default

export const create = async (data: any) => {
    try {
        return await egress.create({
            data: data
        })
    } catch (e: any) {
        console.error(e, "[service]: error while creating egress!!!")
        throw new Error("error while creating!!!")
    }
}

export const remove = async (id: string) => {
    try {
        return await egress.delete({
            where: { egress_id: id },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while removing egress!!!")
        throw new Error('error while removing!!!')
    }
}

export const update = async (id: string, data: any) => {
    try {
        return await egress.update({
            where: { egress_id: id, },
            data: data,
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating egress!!!")
        throw new Error('error while updating!!!')
    }
}

export const updateStatus = async (id: string, status: string) => {
    try {
        return await egress.update({
            where: { egress_id: id, },
            data: { status: status },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating egress status!!!")
        throw new Error('error while updating status!!!')
    }
}

export const findById = async (id: string) => {
    try {
        return await egress.findUnique({
            where: { egress_id: id },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding egress by id!!!")
        throw new Error('error while updating!!!')
    }
}
