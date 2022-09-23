import { gql } from "./query";

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
    id: string,
    status: string,
    availableHour: string,
    availableTime: string
  ) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        gql({ id, status, availableHour, availableTime }).replyOfMentorship
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

  public async fetchMentorshipById(id: string) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ id }).fetchMentorshipById),
    });
  }

  public async fetchYourMentorship(id: string) {
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
