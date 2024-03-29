import { account } from "@/graphql/account";

export async function checkVerified(token: string) {
  if (token?.length) {
    const { data } = await (await account.isVerfied(token)).json();
    const { me } = data;
    if (!me) {
      localStorage.clear();
      return false;
    }
    const isVerified = me?.verified;
    localStorage.setItem("isverified", isVerified || "");
    return true;
  }
  return false;
}
