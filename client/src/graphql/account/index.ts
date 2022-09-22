import { gql } from "./query";
class Account {
  private url = import.meta.env.VITE_API_URL;

  public async isVerfied(token: string) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql(null).isVerified),
    });
  }

  public async fetchYourProfile(token: string) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql(null).hasProfile),
    });
  }

  public async resendActivationEmail(email: string) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ email }).resendEmail),
    });
  }

  public async verifyAccount(token: string | string[]) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ token }).activateAccount),
    });
  }
}

export const account = new Account();
