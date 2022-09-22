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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRhZGF0YSI6IlRoaXMgaXMgcGFydGljaXBhbnQgbWV0YWRhdGEiLCJuYW1lIjoiaGVsbG8tcGFydGljaXBhbnQiLCJ2aWRlbyI6eyJyb29tIjoiaGVsbG8tcm9vbSIsImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJlY29yZGVyIjp0cnVlLCJyb29tQWRtaW4iOnRydWUsInJvb21DcmVhdGUiOnRydWUsInJvb21Kb2luIjp0cnVlLCJyb29tTGlzdCI6dHJ1ZSwicm9vbVJlY29yZCI6dHJ1ZX0sImlhdCI6MTY2Mzg1NzkwNSwibmJmIjoxNjYzODU3OTA1LCJleHAiOjE2NjM4Nzk1MDUsImlzcyI6IkFQSTEyMzRmTlFoRFplQSIsInN1YiI6IndoaWxlIiwianRpIjoid2hpbGUifQ.sV8BRIxZ99PA_eBROf_2v3JiSqcCP3pFtPISHaTkBUI";

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

export async function connect(tracks: LocalTrack[]) {
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
