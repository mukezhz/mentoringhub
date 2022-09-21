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
    profession: string
  ) {
    console.log(
      gql({
        address,
        city,
        country,
        dateOfBirth,
        fullName,
        gender,
        role,
        profession,
      }).createProfile
    );
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
        }).createProfile
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

  public async fetchYourProfileByUsername(username: string) {
    return await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Jwt ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gql({ username }).fetchYourProfileByUsername),
    });
  }
}

export const profile = new Profile();
