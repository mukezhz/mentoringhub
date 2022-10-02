export const gql = (q: any) => {
  return {
    applyForMentorship: {
      query: `mutation applyforMentorship($menteeId: String!, $mentorId: String!, $qna: String!, $title: String!) {
                applyMentorship(menteeId: $menteeId, mentorId: $mentorId, qna: $qna, title: $title) {
                    success
                    status
                    msg
                    id
                }
            }
        `,
      variables: {
        menteeId: q?.menteeId,
        mentorId: q?.mentorId,
        qna: q?.qna,
        title: q?.title,
      },
    },

    replyOfMentorship: {
      query: `mutation replyMentorShip(
                $availableDate: String!,
                $availableTime: String!,
                $description: String!,
                $id: String!,
                $participants: JSONString!,
                $room: String!,
                $status: String!
              ){
                replyMentorship(
                  availableDate: $availableDate,
                  availableTime: $availableTime,
                  id: $id,
                  participants: $participants
                  room: $room,
                  status: $status,
                  description: $description
                ) {
                  success
                  msg
                  status
                }
              }
        `,
      variables: {
        id: q?.id,
        status: q?.status,
        availableDate: q?.availableDate,
        availableTime: q?.availableTime,
        participants: q?.participants,
        room: q?.room,
        description: q?.description,
      },
    },

    fetchMentorship: {
      query: `query fetchMentorshipForMentee {
                fetchMentorships {
                  id
                  title
                  qna
                  mentorId
                  menteeId
                  status
                  available
                  availableHour
                }
              }
        `,
    },

    fetchMentorshipById: {
      query: `query fetchMentorshipById($id: String!) {
                fetchMentorshipById(id: $id) {
                  id
                  title
                  qna
                  mentorId
                  menteeId
                  status
                  available
                  availableHour
                }
              }
        `,
      variables: {
        id: q?.id,
      },
    },

    fetchYourMentorship: {
      query: `query fetchYourMentorship {
                fetchYourMentorship {
                  id
                  title
                  qna
                  mentorId
                  menteeId
                  status
                  available
                  availableHour
                }
              }
        `,
    },
  };
};
