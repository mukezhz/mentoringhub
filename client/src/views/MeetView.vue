<template>
  <a-row justify="center">
    <a-typography-title>Meet</a-typography-title>
  </a-row>

  <!-- Local div -->
  <a-row type="flex" justify="center" align="center">
    <a-col>
      <video
        ref="videoRef"
        autoplay="true"
        :style="{ width: '100%', height: '100%' }"
      />
      <audio ref="audioRef" autoplay="true" />
      <a-tag>{{ localParticipant?.name }}</a-tag>
    </a-col>

    <!-- remote div -->
    <a-col
      v-for="(participant, i) in remoteParticipants"
      :key="participant.identity"
    >
      <video
        v-show="participant.remoteParticiapants?.videoTracks.size"
        :ref="functionVideoRef(i, getTrack(participant.videoSid))"
        :style="{ width: '100%', height: '100%' }"
      ></video>
      <audio
        v-show="participant.remoteParticiapants?.videoTracks.size"
        :ref="functionAudioRef(i, getTrack(participant.audioSid))"
      ></audio>
      <a-tag>
        {{ participant.name }}
      </a-tag>
    </a-col>
  </a-row>
  <a-row justify="start">
    <a-space style="margin-top: 1vh">
      <a-button type="primary" @click="toggleVideo"
        >Camera {{ !video?.isMuted ? "enable" : "disable" }}</a-button
      >
      <a-button type="secondary" @click="toggleAudio"
        >Mic {{ !audio?.isMuted ? "enable" : "disable" }}</a-button
      >
    </a-space>
  </a-row>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import {
  LocalParticipant,
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
import { sendText } from "@/utils/livekit/chat";

interface RemoteParticipantInfo {
  sid: string;
  identity: string;
  name: string;
  isSpeaking: boolean;
  audioSid?: string;
  videoSid?: string;
  remoteParticiapants?: RemoteParticipant;
}

const videoRef = ref<HTMLVideoElement>();
const audioRef = ref<HTMLAudioElement>();
const video = ref<LocalTrack>();
const audio = ref<LocalTrack>();
const router = useRouter();
const route = useRoute();

const remoteTracks = ref<Track[]>([]);
const remoteParticipants = reactive<RemoteParticipantInfo[]>([]);
const localParticipant = ref<LocalParticipant>();

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
  const token = localStorage.getItem("token");
  const livekitUrl = import.meta.env.VITE_LIVEKIT_URL;

  if (!livekitUrl || !token) {
    const { meetingId } = route.params;
    message.error("Unable to connect!!!");
    return router.push(`/premeet/${meetingId}`);
  }
  const room = await connect(livekitUrl, token, [
    ...videoTracks,
    ...audioTracks,
  ]);
  console.log(room);
  localParticipant.value = room?.localParticipant;
  room?.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
});

onUnmounted(async () => {
  console.log("unmounted");
  if (!video.value?.isMuted) await video.value?.mute();
  if (!audio.value?.isMuted) await video.value?.mute();
});

function handleTrackSubscribed(
  track: RemoteTrack,
  publication: RemoteTrackPublication,
  participant: RemoteParticipant
) {
  console.log(participant);
  const remoteParticipant = remoteParticipants.find(
    (data) => data.sid === participant.sid
  );
  if (!remoteParticipant) {
    remoteParticipants?.push({
      sid: participant.sid,
      identity: participant.identity,
      name: participant.name || "",
      remoteParticiapants: participant,
      isSpeaking: participant.isSpeaking,
      audioSid: track.kind === "audio" ? track.sid : "",
      videoSid: track.kind === "video" ? track.sid : "",
    });
  } else {
    remoteParticipant.audioSid = track.kind === "audio" ? track.sid : "";
    remoteParticipant.videoSid = track.kind === "video" ? track.sid : "";
    remoteParticipant.remoteParticiapants = participant;
  }

  const remoteTrack = remoteTracks.value.find(
    (remoteTrack) => remoteTrack.sid === track.sid
  );
  if (!remoteTrack) remoteTracks.value.push(track);
  // console.log("remote tracks", remoteTracks.value);
  // console.log("remote participants", remoteParticipants);
  console.log("all in one", remoteParticipants);
}

const { functionVideoRef, functionAudioRef } = useAudioVideo();

const toggleVideo = async () => {
  const value = await toggleMute(video.value);
  localStorage.setItem("video", !value ? "1" : "");
};

const toggleAudio = async () => {
  const value = await toggleMute(audio.value);
  localStorage.setItem("audio", !value ? "1" : "");
};

// const onSend = async () => {
//   await sendText(localParticipant.value, data, kind);
// };
</script>
