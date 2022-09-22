<template>
  <a-row justify="center">
    <a-col>
      <a-typography-title>Pre Meet Lounge</a-typography-title>
    </a-col>
  </a-row>
  <a-row justify="center">
    <!-- Form Column -->
    <a-col :span="6">
      <a-card>
        <a-typography-title :level="3">Meet Form</a-typography-title>
        <a-form
          :model="formState"
          name="basic"
          layout="vertical"
          :label-col="{ span: 16 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="Your Name"
            name="username"
            :rules="[
              { required: true, message: 'Please input your full name!' },
            ]"
          >
            <a-input size="large"
            v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="Bio"
            name="about"
            :rules="[{ message: 'Please input about yourself!' }]"
          >
            <a-input v-model:value="formState.about" />
          </a-form-item>

          <a-form-item name="remember" :wrapper-col="{ span: 16 }">
            <a-checkbox v-model:checked="formState.remember"
              >Remember me</a-checkbox
            >
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 16 }">
            <a-button type="primary" html-type="submit">Connect</a-button>
          </a-form-item>
        </a-form>
        <a-row justify="center">
          <a-space>
            <a-button type="secondary" shape="round" @click="toggleVideo"
              ><template #icon>
                <video-camera-two-tone />
              </template>
              {{ !video?.isMuted ? "enabled" : "disabled" }}</a-button
            >
            <a-button type="secondary" shape="round" @click="toggleAudio"
              ><template #icon>
                <audio-two-tone />
              </template>
              {{ !audio?.isMuted ? "enabled" : "disabled" }}</a-button
            >
          </a-space>
        </a-row>
      </a-card>
    </a-col>

    <!-- Video Column -->
    <a-col :span="18">
      <video
        autoplay="true"
        ref="videoRef"
        :style="{ width: '80%', height: '80%', margin: '0 auto' }"
      />
      <audio autoplay="true" ref="audioRef" />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted, defineComponent } from "vue";
import type { LocalTrack } from "livekit-client";
import { enableTrack, toggleMute } from "@/utils/livekit/track";
import { useRouter } from "vue-router";
import {
  VideoCameraTwoTone,
  VideoCameraFilled,
  AudioTwoTone,
  AudioFilled,
} from "@ant-design/icons-vue";

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

<style scoped></style>
