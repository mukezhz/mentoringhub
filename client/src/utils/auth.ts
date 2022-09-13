import { gql } from "./queries";
class Auth {
  private url = import.meta.env.VITE_API_URL;

  public async login(email: string, password: string) {
    return await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gql({ email, password }).login),
    });
  }
  public async register(email: string, password1: string, password2: string){
    return await fetch(this.url,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gql({ email, password1, password2 }).register),
    });
  }

}

export const auth = new Auth();

