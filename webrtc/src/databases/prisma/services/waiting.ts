import * as prisma from "../init";
const { waiting } = prisma.default

export const create = async (data: any) => {
    try {
        return await waiting.create({
            data: { ...data }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while creating waiting!!!")
        throw new Error("error while creating!!!")
    }
}

export const remove = async (meetingId: string, userId: string) => {
    try {
        return await waiting.delete({
            where: {
                waiting_identifier: {
                    meeting_id: meetingId,
                    user_id: userId
                },
            },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while removing waiting!!!")
        throw new Error('error while removing!!!')
    }
}

export const update = async (meetingId: string, userId: string, data: any) => {
    try {
        return await waiting.update({
            where: {
                waiting_identifier: {
                    meeting_id: meetingId,
                    user_id: userId
                },
            },
            data: data,
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating waiting!!!")
        throw new Error('error while updating!!!')
    }
}

export const updateStatus = async (meetingId: string, userId: string, status: any) => {
    try {
        return await waiting.update({
            where: {
                waiting_identifier: {
                    meeting_id: meetingId,
                    user_id: userId
                },
            },
            data: {
                status: status
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating status waiting!!!")
        throw new Error('error while updating status!!!')
    }
}

export const updateToken = async (meetingId: string, userId: string, token: string) => {
    try {
        return await waiting.update({
            where: {
                waiting_identifier: {
                    meeting_id: meetingId,
                    user_id: userId
                },
            },
            data: {
                token: token
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating token waiting!!!")
        throw new Error('error while updating token!!!')
    }
}

export const updateStatusToken = async (meetingId: string, userId: string, status: any, token: string | null) => {
    try {
        return await waiting.update({
            where: {
                waiting_identifier: {
                    meeting_id: meetingId,
                    user_id: userId
                },
            },
            data: {
                status: status,
                token: token
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating token waiting!!!")
        throw new Error('error while updating token!!!')
    }
}

export const findAll = async (cursor: any, limit: any) => {
    let data;
    const lim = parseInt(limit) ?? 1
    if (!cursor) data = undefined; else data = cursor;
    try {
        return await waiting.findMany({
            cursor: data,
            take: lim
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding all waiting!!!")
        throw new Error('error while finding all!!!')
    }
}

export const find = async (meetingId: string, userId: string) => {
    try {
        return await waiting.findUnique({
            where: {
                waiting_identifier: {
                    meeting_id: meetingId,
                    user_id: userId
                }
            },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while findOne waiting!!!")
        throw new Error('error while findOne!!!')
    }
}

export const findByStatus = async (meetingId: string, status: any) => {
    try {
        return await waiting.findMany({
            where: {
                meeting_id: meetingId,
                status: status
            },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while findOne waiting!!!")
        throw new Error('error while findOne!!!')
    }
}

export const findOne = async (data: any) => {
    try {
        return await waiting.findUnique({
            where: data,
        })
    } catch (e: any) {
        console.error(e, "[service]: error while findOne waiting!!!")
        throw new Error('error while findOne!!!')
    }
}

export const findByUserId = async (user_id: string) => {
    try {
        return await waiting.findFirst({
            where: {
                user_id: user_id
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding join code waiting!!!")
        throw new Error('error while finding join code!!!')
    }
}

export const findByMeetingId = async (meetingId: string) => {
    try {
        return await waiting.findFirst({
            where: {
                meeting_id: meetingId
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding meeting id waiting!!!")
        throw new Error('error while finding meeting id!!!')
    }
}

export const findByMeetingIdAndUserId = async (meetingId: string, userId: string) => {
    try {
        return await waiting.findFirst({
            where: {
                meeting_id: meetingId,
                user_id: userId
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding by meeting id and user id waiting!!!")
        throw new Error('error while finding by meeting id and user id!!!')
    }
}

export const findByUserName = async (userName: string) => {
    try {
        return await waiting.findFirst({
            where: {
                user_name: userName
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding meeting id waiting!!!")
        throw new Error(e.message)
    }
}

export const deleteRow = async (meetingId: string, userId: string) => {
    try {
        return await waiting.delete({
            where: {
                waiting_identifier: {
                    meeting_id: meetingId,
                    user_id: userId
                }
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while deleting waiting!!!")
        throw new Error(e.message)
    }
}