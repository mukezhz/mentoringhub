import { gql } from "./query";
import { v4 as uuidv4 } from "uuid";

class Mentorship {
  private url = import.meta.env.VITE_API_URL;
  private token = localStorage.getItem("authtoken") || "";

  public async applyForMentorship(
    menteeId: string,
    mentorId: string,
    qna: string,
    title: string
  ) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        gql({ menteeId, mentorId, qna, title }).applyForMentorship
      ),
    });
  }

  public async replyOfMentorship(
    id: string | string[],
    status: string,
    availableDate: string,
    availableTime: string,
    participants: string,
    description: string
  ) {
    const room_id = uuidv4();
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        gql({
          id,
          status,
          availableDate,
          availableTime,
          participants,
          room_id,
          description,
        }).replyOfMentorship
      ),
    });
  }

  public async fetchMentorship() {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql(null).fetchMentorship),
    });
  }

  public async fetchMentorshipById(id: string | string[]) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ id }).fetchMentorshipById),
    });
  }

  public async fetchYourMentorship() {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql(null).fetchYourMentorship),
    });
  }
}

export const mentorship = new Mentorship();
