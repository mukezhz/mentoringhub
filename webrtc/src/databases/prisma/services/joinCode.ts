import * as prisma from "../init";
import * as nanoid from "nanoid";
const { joinCode, meeting } = prisma.default

export const create = async (data: any) => {
    try {
        return await joinCode.create({
            data: { ...data, join_code: nanoid.customAlphabet('qwertyuioplkjhgfdsazxcvbnm', 10)() }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while creating join code!!!")
        throw new Error("error while creating!!!")
    }
}

export const remove = async (identity: string, meetingId: string) => {
    try {
        return await joinCode.delete({
            where: {
                join_code_identifier: {
                    identity: identity,
                    meeting_id: meetingId
                },
            },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while removing join code!!!")
        throw new Error('error while removing!!!')
    }
}

export const update = async (identity: string, meetingId: string, data: any) => {
    try {
        return await joinCode.update({
            where: {
                join_code_identifier: {
                    identity: identity,
                    meeting_id: meetingId
                },
            },
            data: data,
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating join code!!!")
        throw new Error('error while updating!!!')
    }
}

export const updateExpireTime = async (identity: string, meetingId: string, expireTime: number) => {
    try {
        return await joinCode.update({
            where: {
                join_code_identifier: {
                    identity: identity,
                    meeting_id: meetingId
                },
            },
            data: {
                expire_time: expireTime,
                join_code: nanoid.customAlphabet('qwertyuioplkjhgfdsazxcvbnm', 10)()
            },
        })
    } catch (e: any) {
        console.error(e, "[service]: error while updating expire time in join code!!!")
        throw new Error('error while updating!!!')
    }
}

export const findAll = async (cursor: any, limit: any) => {
    let data;
    const cur: any = parseInt(cursor)
    const lim = parseInt(limit) ?? 1
    if (isNaN(cur) || cur === 0) data = undefined; else data = { join_code: cur };
    try {
        return await joinCode.findMany({
            cursor: data,
            take: lim
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding all join code!!!")
        throw new Error('error while finding all!!!')
    }
}

export const findOne = async (data: any) => {
    try {
        return await joinCode.findUnique({
            where: data,
        })
    } catch (e: any) {
        console.error(e, "[service]: error while findOne join code!!!")
        throw new Error('error while findOne!!!')
    }
}

export const findByJoinCode = async (code: string) => {
    try {
        return await joinCode.findUnique({
            where: {
                join_code: code
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding join code!!!")
        throw new Error('error while finding join code!!!')
    }
}

export const findByMeetingJoinCode = async (meetingId: string, identity: string, code: string) => {
    try {
        return await joinCode.findFirst({
            where: {
                join_code: code,
                identity: identity,
                meeting_id: meetingId
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding meeting join code!!!")
        throw new Error('error while finding meeting join code!!!')
    }
}

export const findById = async (meetingId: string) => {
    try {
        return await joinCode.findFirst({
            where: {
                meeting_id: meetingId
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding meeting id join code!!!")
        throw new Error('error while finding meeting id!!!')
    }
}

export const findMeetingIdIdentity = async (meetingId: string, identity: string) => {
    try {
        return await joinCode.findFirst({
            where: {
                meeting_id: meetingId,
                identity: identity
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding meeting id and join code!!!")
        throw new Error(e.message)
    }
}

export const findMeetingByJoinCode = async (code: string) => {
    try {
        return await joinCode.findFirst({
            where: {
                join_code: code
            }
        })
    } catch (e: any) {
        console.error(e, "[service]: error while finding meeting id and join code!!!")
        throw new Error(e.message)
    }
}
