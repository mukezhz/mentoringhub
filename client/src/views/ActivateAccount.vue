<template>
  <div>is verified :- {{ isVerified }}</div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { account } from "@/utils/account";

const isVerified = ref<boolean>(false);
const route = useRoute();

onMounted(async () => {
  const { token } = route.params;
  if (!token.length) return;
  const res = await account.verifyAccount(token);
  const resData = await res.json();
  const {
    data: { verifyAccount },
  } = resData;
  const { success, errors } = verifyAccount;
  console.log(errors?.nonFieldErrors);
  if (success || errors?.nonFieldErrors.length) isVerified.value = true;
  for (const i in errors) {
    for (const j of errors[i]) {
      message.error(j.message);
    }
  }
});
</script>

<style lang="scss" scoped></style>
