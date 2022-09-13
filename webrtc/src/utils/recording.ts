import * as stream from './stream'
import * as livekit from 'livekit-server-sdk';
import * as egress from "livekit-server-sdk/dist/proto/livekit_egress";
/*
interface EncodedFileOutput {
    // [optional]
    fileType: EncodedFileType;
    // [optional]
    filepath: string;
    s3?: S3Upload | undefined;
    gcp?: GCPUpload | undefined;
    azure?: AzureBlobUpload | undefined;
}
interface StreamOutput {
    // [required]
    protocol: StreamProtocol;
    // [required]
    urls: string[];
}
declare enum EncodingOptionsPreset {
    // H264_720P_30 - 720p, 30fps, 3000kpbs, H.264_MAIN / OPUS
    H264_720P_30 = 0,
    // H264_720P_60 - 720p, 60fps, 4500kbps, H.264_MAIN / OPUS
    H264_720P_60 = 1,
    // H264_1080P_30 - 1080p, 30fps, 4500kbps, H.264_MAIN / OPUS
    H264_1080P_30 = 2,
    // H264_1080P_60 - 1080p, 60fps, 6000kbps, H.264_MAIN / OPUS
    H264_1080P_60 = 3,
    UNRECOGNIZED = -1
}
interface EncodingOptions {
    // (default 1920)
    width: number;
    // (default 1080)
    height: number;
    // (default 24)
    depth: number;
    // (default 30)
    framerate: number;
    // (default OPUS)
    audioCodec: AudioCodec;
    // (default 128)
    audioBitrate: number;
    // (default 44100)
    audioFrequency: number;
    // (default H264_MAIN)
    videoCodec: VideoCodec;
    // (default 4500)
    videoBitrate: number;
}
interface EgressInfo {
    egressId: string;
    roomId: string;
    status: EgressStatus;
    startedAt: number;
    endedAt: number;
    error: string;
    roomComposite?: RoomCompositeEgressRequest | undefined;
    trackComposite?: TrackCompositeEgressRequest | undefined;
    track?: TrackEgressRequest | undefined;
    stream?: StreamInfoList | undefined;
    file?: FileInfo | undefined;
}
*/

export const getEgressClient = (host: string, apiKey: string, apiSecret: string): livekit.EgressClient | boolean => {
    try {
        return new livekit.EgressClient(host, apiKey, apiSecret)
    } catch (e) {
        console.error(e)
        console.error('[Utils]: error while getting recoding service client!!!')
        return false
    }
}

export const listEgress = async (ec: livekit.EgressClient, roomName?: string): Promise<egress.EgressInfo[] | boolean> => {
    try {
        return await ec.listEgress(roomName)
    } catch (e) {
        console.error(e)
        console.error('[Utils]: error while listing egress!!!')
        return false
    }
}

export const startRoomCompositeEgress = async (ec: livekit.EgressClient, roomName: string, layout: string, output: egress.EncodedFileOutput | egress.StreamOutput, options?: egress.EncodingOptionsPreset | egress.EncodingOptions, audioOnly?: boolean, videoOnly?: boolean, customBaseUrl?: string): Promise<egress.EgressInfo | undefined> => {
    try {
        return await ec.startRoomCompositeEgress(roomName, output, layout, options, audioOnly, videoOnly, customBaseUrl)
    } catch (e: any) {
        console.error('[Utils]: error while starting room composite egress!!!')
        throw (e?.response?.data?.msg)
    }
}

export const startStreamEgress = async (ec: livekit.EgressClient, platform: string, streamKey: string, roomName: string, layout: string, options?: egress.EncodingOptionsPreset | egress.EncodingOptions, audioOnly?: boolean, videoOnly?: boolean, customBaseUrl?: string): Promise<egress.EgressInfo | undefined> => {
    let url = '';
    const output = {
        protocol: egress.StreamProtocol.RTMP,
        urls: [] as string[]
    }
    switch (platform.toLowerCase()) {
        case 'youtube':
            url = stream.streamSites.youtube;
            break;
        case 'facebook':
            url = stream.streamSites.facebook;
            break;
        case 'twitch':
            url = stream.streamSites.twitch;
            break;
        default:
            url = platform.toLowerCase();
            break;
    }
    url = `${url}/${streamKey}`
    output.urls.push(url)
    try {
        return await startRoomCompositeEgress(ec, roomName, layout, output, options, audioOnly, videoOnly, customBaseUrl)
    } catch (e: any) {
        console.error('[Utils]: error while starting streaming using egress!!!')
        throw (e as string)
    }
}

export const stopEgress = async (ec: livekit.EgressClient, egressId: string): Promise<egress.EgressInfo | boolean> => {
    try {
        return await ec.stopEgress(egressId)
    } catch (e) {
        console.error(e)
        console.error('[Utils]: error while stopping egress!!!')
        return false
    }
}

export const updateLayout = async (ec: livekit.EgressClient, egressId: string, layout: string): Promise<egress.EgressInfo | boolean> => {
    try {
        return await ec.updateLayout(egressId, layout)
    } catch (e) {
        console.error(e)
        console.error('[Utils]: error while updating layout!!!')
        return false
    }
}

export const updateStream = async (ec: livekit.EgressClient, egressId: string, platform: string, streamKey: string, addOutputUrls?: string[], removeOutputUrls?: string[]): Promise<egress.EgressInfo | boolean> => {
    let url = '';
    const output = {
        protocol: egress.StreamProtocol.RTMP,
        urls: [] as string[]
    }
    switch (platform.toLowerCase()) {
        case 'youtube':
            url = stream.streamSites.youtube;
            break;
        case 'facebook':
            url = stream.streamSites.facebook;
            break;
        case 'twitch':
            url = stream.streamSites.twitch;
            break;
        default:
            url = platform.toLowerCase();
            break;
    }
    url = `${url}/${streamKey}`
    output.urls.push(url)
    try {
        return await ec.updateStream(egressId, addOutputUrls, removeOutputUrls)
    } catch (e) {
        console.error(e)
        console.error('[Utils]: error while updating stream!!!')
        return false
    }
}