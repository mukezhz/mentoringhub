import { ref, onMounted, onBeforeUnmount } from "vue";

export function useName() {
  const elements = ref<any[]>([]);
  const surElements = ref<any[]>([]);

  const functionRef = (i: number) => (el: any) => (elements.value[i] = el);
  const surFunctionRef = (i: number) => (el: any) =>
    (surElements.value[i] = el);

  onMounted(() => {
    console.log(elements.value); // [li, li ,li]
  });

  onBeforeUnmount(() => {
    elements.value = [];
    surElements.value = [];
  });

  return {
    functionRef,
    surFunctionRef,
  };
}
