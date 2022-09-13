import {
  RemoteParticipant,
  RemoteTrackPublication,
  RemoteTrack,
  Participant,
  Track,
  LocalParticipant,
  LocalTrackPublication,
} from "livekit-client";

interface RemoteParticipantType {
  identity: string;
  sid: string;
}
const remoteParticipants: RemoteParticipantType[] = [];

export function handleTrackSubscriptionFailed(
  trackSid: string,
  participant: RemoteParticipant
) {
  console.log(trackSid);
}

export function handleLocalTrackPublished(
  localTrackPublication: LocalTrackPublication,
  localParticipant: LocalParticipant
) {
  console.log(localTrackPublication);
  console.log(localParticipant);
}

export function handleTrackSubscribed(
  track: RemoteTrack,
  publication: RemoteTrackPublication,
  participant: RemoteParticipant
) {
  console.log("==============handle track subscribed===========");
  remoteParticipants.push({
    sid: participant.sid,
    identity: participant.identity,
  });
  if (track.kind === Track.Kind.Video) {
    const element = track.attach();
  } else if (track.kind === Track.Kind.Audio) {
    const element = track.attach();
  }
}
export function handleTrackUnsubscribed(
  track: RemoteTrack,
  publication: RemoteTrackPublication,
  participant: RemoteParticipant
) {
  // remove tracks from all attached elements
  track.detach();
}

export function handleLocalTrackUnpublished(
  track: LocalTrackPublication,
  participant: LocalParticipant
) {
  // when local tracks are ended, update UI to remove them from rendering
  track.detach();
}

export function handleActiveSpeakerChange(speakers: Participant[]) {
  // show UI indicators when participant is speaking
}

export function handleDisconnect() {
  console.log("disconnected from room");
}
