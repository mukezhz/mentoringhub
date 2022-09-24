import { gql } from "./query";

class Recommend {
  private url = import.meta.env.VITE_API_URL;
  private token = localStorage.getItem("authtoken") || "";

  public async collaborateFiltering() {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql(null).collaborateFiltering),
    });
  }

  public async contentFiltering(email: string) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ email }).contentFiltering),
    });
  }
}

export const recommend = new Recommend();
