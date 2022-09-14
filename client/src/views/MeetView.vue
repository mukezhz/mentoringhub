<template>
  <!-- <ul>
    <li v-for="(name, i) in names" :key="name" :ref="functionRef(i)">
      {{ name }}
    </li>
    <li v-for="(name, i) in surNames" :key="name" :ref="surFunctionRef(i)">
      {{ name }}
    </li>
  </ul> -->
  <a-typography-title>Meet</a-typography-title>
  <!-- Local div -->
  <div>
    <video
      autoplay="true"
      ref="videoRef"
      :style="{ width: '50%', height: '50%', margin: '0 auto' }"
    />

    <audio autoplay="true" ref="audioRef" />
  </div>
  <div>
    <!-- remote div -->
    <div v-for="(participant, i) in remoteParticipants" :key="participant.sid">
      {{ participant.identity }}
      {{ participant.videoSid }}
      {{ participant.audioSid }}
      <video
        v-show="participant.videoSid?.length"
        :ref="functionVideoRef(i, getTrack(participant.videoSid))"
      ></video>
      <audio
        v-show="participant.audioSid?.length"
        :ref="functionAudioRef(i, getTrack(participant.audioSid))"
      ></audio>
    </div>
  </div>
  <a-button type="primary" @click="toggleVideo"
    >Camera {{ !video?.isMuted ? "enable" : "disable" }}</a-button
  >
  <a-button type="secondary" @click="toggleAudio"
    >Mic {{ !audio?.isMuted ? "enable" : "disable" }}</a-button
  >
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  RoomEvent,
  type LocalTrack,
  type Track,
} from "livekit-client";
import { enableTrack, toggleMute } from "@/utils/livekit/track";
import { useAudioVideo } from "@/refs/useAudioVideo";
import { connect } from "@/utils/livekit";

interface RemoteParticipantInfo {
  sid: string;
  identity: string;
  name: string;
  isSpeaking: boolean;
  audioSid?: string;
  videoSid?: string;
}

const videoRef = ref<HTMLVideoElement>();
const audioRef = ref<HTMLAudioElement>();
const video = ref<LocalTrack>();
const audio = ref<LocalTrack>();

const remoteTracks = ref<Track[]>([]);
const remoteParticipants = ref<RemoteParticipantInfo[]>([]);

function getTrack(sid: string | undefined) {
  if (!sid) return;
  return remoteTracks.value.find((track) => track.sid === sid);
}

onMounted(async () => {
  // TODO: depending upon values from localstorage the video should be on or off
  const { videoTracks, audioTracks } = await enableTrack(
    { video: true, audio: true },
    videoRef.value,
    audioRef.value
  );
  video.value = videoTracks[0];
  audio.value = audioTracks[0];
  if (!localStorage.getItem("audio")?.length) toggleAudio();
  if (!localStorage.getItem("video")?.length) toggleVideo();
  const room = await connect([...videoTracks, ...audioTracks]);
  console.log(room);
  room?.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
});

function handleTrackSubscribed(
  track: RemoteTrack,
  publication: RemoteTrackPublication,
  participant: RemoteParticipant
) {
  const remoteParticipant = remoteParticipants.value.find(
    (data) => data.sid === participant.sid
  );
  if (!remoteParticipant) {
    remoteParticipants.value?.push({
      sid: participant.sid,
      identity: participant.identity,
      name: participant.name || "",
      isSpeaking: participant.isSpeaking,
      audioSid: track.kind === "audio" ? track.sid : "",
      videoSid: track.kind === "video" ? track.sid : "",
    });
  } else {
    remoteParticipant.audioSid = track.kind === "audio" ? track.sid : "";
    remoteParticipant.videoSid = track.kind === "video" ? track.sid : "";
  }

  const remoteTrack = remoteTracks.value.find(
    (remoteTrack) => remoteTrack.sid === track.sid
  );
  if (!remoteTrack) remoteTracks.value.push(track);
  console.log("remote tracks", remoteTracks.value);
  console.log("remote participants", remoteParticipants.value);
}
onUnmounted(async () => {
  console.log("unmounted");
  if (!video.value?.isMuted) await video.value?.mute();
  if (!audio.value?.isMuted) await video.value?.mute();
});

const { functionVideoRef, functionAudioRef } = useAudioVideo();

const toggleVideo = async () => {
  const value = await toggleMute(video.value);
  localStorage.setItem("video", !value ? "1" : "");
};

const toggleAudio = async () => {
  const value = await toggleMute(audio.value);
  localStorage.setItem("audio", !value ? "1" : "");
};
</script>
