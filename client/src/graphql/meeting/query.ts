export const gql = (q: any) => {
  return {
    fetchYourMeetings: {
      query: `query fetchYourMeetings {
                fetchYourMeetings {
                  id
                  room
                  title
                  description
                  participants
                  status
                  coverImage
                  createdAt
                  updatedAt
                  users {
                    email
                  }
                }
              }
          `,
    },
    fetchMeetingById: {
      query: `query fetchMeetingById($id: String!) {
                fetchMeetingById(id: $id) {
                  id
                  room
                  title
                  description
                  participants
                  status
                  coverImage
                  createdAt
                  updatedAt
                  users {
                    email
                  }
              }
          `,
      variables: {
        id: q?.id,
      },
    },

    fetchMeetingByEmail: {
      query: `query fetchMeetingByEmail($email: String!) {
                fetchMeetingByEmail(email: $email) {
                  id
                  room
                  title
                  description
                  participants
                  status
                  coverImage
                  createdAt
                  updatedAt
                  users {
                    email
                  }
              }
          `,
      variables: {
        email: q?.email,
      },
    },
  };
};
