import { gql } from "./query";

class Meeting {
  private url = import.meta.env.VITE_API_URL;
  private token = localStorage.getItem("authtoken") || "";

  public async fetchYourMeetings() {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql(null).fetchYourMeetings),
    });
  }

  public async fetchMeetingById(id: string) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ id }).fetchMeetingById),
    });
  }

  public async fetchMeetingByEmail(email: string) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ email }).fetchMeetingByEmail),
    });
  }
}

export const meeting = new Meeting();
