export const gql = (q: any) => {
  return {
    applyForMentorship: {
      query: `mutation applyforMentorship($menteeId: String!, $mentorId: String!, $qna: String!, $title: String!) {
                applyMentorship(menteeId: $menteeId, mentorId: $mentorId, qna: $qna, title: $title) {
                    success
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
      query: `mutation replyOfMentorship($id: String!, $status: String!, $availableHour: DateTime!, $availableTime: DateTime!) {
                replyMentorship(id: $id, status: $status, availableHour: $availableHour, availableTime: $availableTime) {
                    success
                    status
                    msg
                }
            }
        `,
      variables: {
        id: q?.id,
        status: q?.status,
        availableHour: q?.availableHour,
        availableTime: q?.availableTime,
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
  };
};
