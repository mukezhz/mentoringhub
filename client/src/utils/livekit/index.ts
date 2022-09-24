import {
  LocalTrack,
  RemoteParticipant,
  Room,
  RoomEvent,
  VideoPresets,
} from "livekit-client";

import {
  handleTrackSubscriptionFailed,
  handleLocalTrackPublished,
  handleTrackSubscribed,
  handleTrackUnsubscribed,
  handleActiveSpeakerChange,
  handleDisconnect,
  handleLocalTrackUnpublished,
} from "./handlers";
import { publishTracks } from "./track";

const url = "ws://localhost:7880";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRhZGF0YSI6IlRoaXMgaXMgcGFydGljaXBhbnQgbWV0YWRhdGEiLCJuYW1lIjoibXVrZXNoIiwidmlkZW8iOnsicm9vbSI6InRlc3Ryb29tIiwiY2FuUHVibGlzaCI6dHJ1ZSwiY2FuUHVibGlzaERhdGEiOnRydWUsImNhblN1YnNjcmliZSI6dHJ1ZSwicmVjb3JkZXIiOnRydWUsInJvb21BZG1pbiI6dHJ1ZSwicm9vbUNyZWF0ZSI6dHJ1ZSwicm9vbUpvaW4iOnRydWUsInJvb21MaXN0Ijp0cnVlLCJyb29tUmVjb3JkIjp0cnVlfSwiaWF0IjoxNjYzOTMzNDUwLCJuYmYiOjE2NjM5MzM0NTAsImV4cCI6MTY2Mzk1NTA1MCwiaXNzIjoiQVBJMTIzNGZOUWhEWmVBIiwic3ViIjoibXVrZXNoIiwianRpIjoibXVrZXNoIn0.y6ORdvplSjymw8aoCacZiTEcRp1gNLzldzmmqG0w9Z8";

// creates a new room with options
export const room = new Room({
  // automatically manage subscribed video quality
  adaptiveStream: true,
  // optimize publishing bandwidth and CPU for published tracks
  dynacast: true,
  // default capture settings
  videoCaptureDefaults: {
    resolution: VideoPresets.h720.resolution,
  },
});

export async function connect(
  url: string,
  token: string,
  tracks: LocalTrack[]
) {
  // // connect to room
  try {
    await room.connect(url, token, {
      autoSubscribe: true,
    });
    const localTrackPublications = await publishTracks(room, tracks);
    return room;
  } catch (e) {
    console.log(e);
  }
}
// set up event listeners
// room
//   .on(RoomEvent.TrackSubscriptionFailed, handleTrackSubscriptionFailed)
//   .on(RoomEvent.LocalTrackPublished, handleLocalTrackPublished)
// .on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
//   .on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
//   .on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakerChange)
//   .on(RoomEvent.Disconnected, handleDisconnect)
//   .on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished);

// // publish local camera and mic tracks
// await room.localParticipant.enableCameraAndMicrophone();
