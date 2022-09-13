import { AccessToken, TokenVerifier } from 'livekit-server-sdk';

type VerifyType = {
    video: {
        roomJoin: boolean,
        room: string,
        canPublish: boolean,
        canSubscribe: boolean
    },
    iat: number,
    nbf: number,
    exp: number,
    iss: string,
    sub: string,
    jti: string
}

export function obtainAdminToken(roomName: string, identity: string, apiKey: string, apiSecret: string, participantName: string, metadata: string, ttl: string | number) {
    const at = new AccessToken(apiKey, apiSecret, {
        metadata: metadata,
        name: participantName,
        identity: identity,
        ttl
    });
    at.addGrant({
        room: roomName,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
        recorder: true,
        roomAdmin: true,
        roomCreate: true,
        roomJoin: true,
        roomList: true,
        roomRecord: true,
    });
    const token = at.toJwt();
    return token
}

export function obtainMemberToken(roomName: string, identity: string, apiKey: string, apiSecret: string, participantName: string, metadata: string = "") {
    const at = new AccessToken(apiKey, apiSecret, {
        identity: identity,
        name: participantName,
        metadata: metadata
    });
    at.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true
    });
    const token = at.toJwt();
    return token
}

export function obtainViewerToken(roomName: string, identity: string, apiKey: string, apiSecret: string, participantName: string, metadata: string = "") {
    try {
        const at = new AccessToken(apiKey, apiSecret, {
            identity: identity,
            name: participantName,
            metadata: metadata
        });
        at.addGrant({
            room: roomName,
            roomJoin: true,
            canPublish: false,
            canSubscribe: true,
            canPublishData: true
        });
        const token = at.toJwt();
        return token
    } catch (e) {
        console.error("error while obtaining token for viewer!!!")
    }
}

export function obtainWaitingToken(roomName: string, identity: string, apiKey: string, apiSecret: string, participantName: string) {
    try {
        const at = new AccessToken(apiKey, apiSecret, {
            identity: identity,
            name: participantName
        });
        at.addGrant({
            room: roomName,
            roomJoin: true,
            canPublish: false,
            canSubscribe: false,
            canPublishData: false
        });
        const token = at.toJwt();
        return token
    } catch (e) {
        console.error("error while obtaining token for waiting!!!")
    }
}

export function verifyToken(token = "", apiKey: string, apiSecret: string) {
    const tokenController = new TokenVerifier(apiKey, apiSecret)
    const verify = <VerifyType>tokenController.verify(token)
    return verify
}