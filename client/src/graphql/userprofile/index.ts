import { gql } from "./query";
class Profile {
  private url = import.meta.env.VITE_API_URL;
  private token = localStorage.getItem("authtoken") || "";

  public async createProfile(
    address: string,
    city: string,
    country: string,
    dateOfBirth: string,
    fullName: string,
    gender: string,
    role: string,
    profession: string,
    mobilePhone: string,
    aboutUser: string,
    languages: string,
    interests: string,
    skills: string
  ) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        gql({
          address,
          city,
          country,
          dateOfBirth,
          fullName,
          gender,
          role,
          profession,
          mobilePhone,
          aboutUser,
          languages,
          interests,
          skills,
        }).createProfile
      ),
    });
  }

  public async updateProfile(
    address: string,
    city: string,
    country: string,
    dateOfBirth: string,
    fullName: string,
    gender: string,
    role: string,
    profession: string,
    mobilePhone: string,
    aboutUser: string,
    languages: string,
    interests: string,
    skills: string
  ) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        gql({
          address,
          city,
          country,
          dateOfBirth,
          fullName,
          gender,
          role,
          profession,
          mobilePhone,
          aboutUser,
          languages,
          interests,
          skills,
        }).updateProfile
      ),
    });
  }

  public async fetchYourProfile() {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql(null).fetchYourProfile),
    });
  }

  public async fetchYourProfileByUsername(username: string | string[]) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ username }).fetchYourProfileByUsername),
    });
  }
  public async fetchYourProfileByRole(role: string | string[]) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ role }).fetchYourProfileByRole),
    });
  }
}

export const profile = new Profile();
