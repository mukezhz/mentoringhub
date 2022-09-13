import type { Track } from "livekit-client";
import { ref, onMounted, onBeforeUnmount } from "vue";

export function useAudioVideo() {
  const audioTracks = ref<any[]>([]);
  const videoTracks = ref<any[]>([]);

  const functionVideoRef = (i: number, track: Track | any) => (el: any) => {
    if (track) track.attach(el);
    return (videoTracks.value[i] = el);
  };
  const functionAudioRef = (i: number, track: Track | any) => (el: any) => {
    if (track) track.attach(el);
    return (audioTracks.value[i] = el);
  };

  onMounted(() => {
    console.log(audioTracks.value);
    console.log(videoTracks.value);
  });

  onBeforeUnmount(() => {
    audioTracks.value = [];
    videoTracks.value = [];
  });

  return {
    functionVideoRef,
    functionAudioRef,
  };
}
