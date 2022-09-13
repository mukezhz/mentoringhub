import { LocalTrack, createLocalTracks, Room } from "livekit-client";

export const enableTrack = async (
  constraints = { video: true, audio: true },
  videoElement?: HTMLVideoElement,
  audioElement?: HTMLAudioElement
) => {
  const tracks = await createLocalTracks(constraints);
  interface AudioVideoTracks {
    audioTracks: Array<LocalTrack>;
    videoTracks: Array<LocalTrack>;
  }
  const audioVideoTracks: AudioVideoTracks = {
    audioTracks: [],
    videoTracks: [],
  };
  tracks.forEach((track) => {
    if (track.kind === "video") {
      if (!videoElement) return;
      track.attach(videoElement);
      audioVideoTracks.videoTracks.push(track);
    } else if (track.kind === "audio") {
      if (!audioElement) return;
      track.attach(audioElement);
      audioVideoTracks.audioTracks.push(track);
    }
  });
  return audioVideoTracks;
};

export const enableVideoTrack = async (videoElement?: HTMLVideoElement) => {
  const tracks = await createLocalTracks({ video: true });
  if (!videoElement) return;
  const videoTracks = tracks.filter((track) => {
    if (track.kind === "video") {
      track.attach(videoElement);
      console.log(track);
      return track;
    }
  });
  return videoTracks?.[0];
};

export const enableAudioTrack = async (audioElement?: HTMLAudioElement) => {
  if (!audioElement) return;
  const tracks = await createLocalTracks({ audio: true });
  const audioTracks = tracks.filter((track) => {
    if (track.kind === "audio") {
      // track.attach(audioElement);
      return track;
    }
  });
  return audioTracks?.[0];
};

export const toggleMute = async (track?: LocalTrack) => {
  if (!track) return;
  if (track?.isMuted) await track?.unmute();
  else await track?.mute();
  return isTrackMuted(track);
};

export const isTrackMuted = (track: LocalTrack) => {
  return track.isMuted;
};

export const publishTracks = async (room: Room, tracks: LocalTrack[]) => {
  try {
    const LocalTrackPublications = await Promise.all(
      tracks.map(
        async (track) => await room.localParticipant.publishTrack(track)
      )
    );
    return LocalTrackPublications;
  } catch (e) {
    console.log(e);
    console.log("Error while publishing track");
  }
};
