import { account } from ".";

export async function checkVerified(token: string) {
  if (token?.length) {
    const { data } = await (await account.isVerfied(token)).json();
    console.log(data);
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
