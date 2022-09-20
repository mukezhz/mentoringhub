export const gql = (q: any) => {
  return {
    createProfile: {
      query: `mutation createUserProfile($address: String!, $city: String!, $country: String!, $dateOfBirth: String!, $fullName: String!, $gender: String!, $role: String!, $profession: String!) {
                    createUserProfile(address: $address, city: $city, country: $country, dateOfBirth: $dateOfBirth, fullName: $fullName, gender: $gender, role: $role, profession: $profession) {
                    success
                    msg
                    }
                }
            `,
      variables: {
        address: q?.address,
        city: q?.city,
        country: q?.country,
        dateOfBirth: q?.dateOfBirth,
        fullName: q?.fullName,
        gender: q?.gender,
        role: q?.role,
        profession: q?.profession,
      },
    },
    fetchYourProfile: {
      query: `query fetchYourProfile {
                fetchYourProfile {
                    user {
                        username
                        email
                    }
                    fullName
                    dateOfBirth
                    address
                    city
                    country
                    gender
                    mobilePhone
                    role
                    profession
                    userinterest {
                        interest
                        domain
                    }
                    userskill {
                        skill
                        domain
                    }
                }
            }
        `,
    },
    fetchYourProfileByUsername: {
      query: `query fetchProfileAccordingToUsername($username: String!) {
                fetchProfileAccordingToUsername(username: $username) {
                  fullName
                  dateOfBirth
                  address
                  city
                  country
                  gender
                  mobilePhone
                  role
                  profession
                  userinterest{
                    id
                    interest
                    domain
                  }
                  userskill {
                    id
                    skill
                    domain
                  }
                }
              }
        `,
      variables: {
        username: q?.username,
      },
    },
  };
};
