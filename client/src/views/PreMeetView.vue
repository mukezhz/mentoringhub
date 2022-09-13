<template>
  <h1>Pre Meet</h1>
  <div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Your Name"
        name="username"
        :rules="[{ required: true, message: 'Please input your full name!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Bio"
        name="about"
        :rules="[{ message: 'Please input about yourself!' }]"
      >
        <a-input v-model:value="formState.about" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember"
          >Remember me</a-checkbox
        >
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Connect</a-button>
      </a-form-item>
    </a-form>
  </div>
  <div>
    <video
      autoplay="true"
      ref="videoRef"
      :style="{ width: '50%', height: '50%', margin: '0 auto' }"
    />
    
    <audio autoplay="true" ref="audioRef" />
  </div>
  <a-button type="primary" @click="toggleVideo"
    >Camera {{ !video?.isMuted ? "enable" : "disable" }}</a-button
  >
  <a-button type="secondary" @click="toggleAudio"
    >Mic {{ !audio?.isMuted ? "enable" : "disable" }}</a-button
  >
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from "vue";
import type { LocalTrack } from "livekit-client";
import { enableTrack, toggleMute } from "@/utils/livekit/track";
import { useRouter } from "vue-router";

interface FormState {
  username: string;
  about: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: localStorage.getItem("name") || "",
  about: localStorage.getItem("about") || "",
  remember: !!localStorage.getItem("name") || true,
});
const videoRef = ref<HTMLVideoElement>();
const audioRef = ref<HTMLAudioElement>();
const video = ref<LocalTrack>();
const audio = ref<LocalTrack>();

const router = useRouter();

const onFinish = (values: FormState) => {
  const { username, about, remember } = values;
  if (remember) {
    localStorage.setItem("name", username);
    localStorage.setItem("about", about);
    localStorage.setItem("remember", remember ? "1" : "");
  } else {
    localStorage.removeItem("name");
    localStorage.removeItem("about");
    localStorage.removeItem("remember");
  }
  router.push({
    name: "meet",
    force: true,
  });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

onMounted(async () => {
  const { videoTracks, audioTracks } = await enableTrack(
    { video: true, audio: true },
    videoRef.value,
    audioRef.value
  );
  video.value = videoTracks[0];
  audio.value = audioTracks[0];
  if (!localStorage.getItem("audio")?.length) toggleAudio();
  if (!localStorage.getItem("video")?.length) toggleVideo();
});

onUnmounted(async () => {
  console.log("unmounted");
  if (!video.value?.isMuted) await video.value?.mute();
  if (!audio.value?.isMuted) await video.value?.mute();
});

const toggleVideo = async () => {
  const value = await toggleMute(video.value);
  localStorage.setItem("video", !value ? "1" : "");
};

const toggleAudio = async () => {
  const value = await toggleMute(audio.value);
  localStorage.setItem("audio", !value ? "1" : "");
};
</script>
