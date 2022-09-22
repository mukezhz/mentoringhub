<template>
  <a-layout>
    <a-layout-header/>
    <a-layout-content>
 
  <template v-if=isVerified >
    <a-result
    status="success"
    title="Congratulations! Your account is verified. "
    sub-title="Proceed to Dashboard by clicking the button below:"
  >
    <template #extra>
      <router-link to="/dashboard">
        <a-button  type="primary" size="large">Dashboard</a-button>
      </router-link>
      
    </template>
  </a-result>
  </template>
  <template v-else>
    <a-result 
      status="warning"
      sub-title="Please Verify your account to get the best experience."
      title="Your account has not been verified."
    >
    <template #extra>
      <a-button size="large" type="primary">Send Verification</a-button>
    </template>
  </a-result>

  </template>
</a-layout-content>
</a-layout>
  
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { account } from "@/graphql/account";

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
