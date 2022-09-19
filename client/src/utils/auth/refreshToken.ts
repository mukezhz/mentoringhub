import { auth } from ".";

export async function regenerateTokenFromRefreshToken(token: string) {
  if (token?.length) {
    const { data } = await (await auth.regenerateToken(token)).json();
    const { refreshToken } = data;
    const email = localStorage.getItem("email");
    if (
      !refreshToken ||
      refreshToken?.errors ||
      refreshToken?.payload?.username !== email
    ) {
      localStorage.clear();
      return false;
    }
    if (refreshToken?.success) {
      localStorage.setItem("authtoken", refreshToken?.token || "");
      localStorage.setItem("email", refreshToken?.payload?.username);
      return true;
    }
  }
  return false;
}
