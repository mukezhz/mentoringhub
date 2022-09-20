export const gql = (q: any) => {
  return {
    applyForMentorship: {
      query: `mutation applyforMentorship($menteeId: String!, $mentorId: String!, $qna: String!, $title: String!) {
                applyMentorship(menteeId: $menteeId, mentorId: $mentorId, qna: $qna, title: $title) {
                    success
                    msg
                    data
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
    regenerateToken: {
      query: `
          mutation regenerateToken($refreshToken: String!) {
            refreshToken(refreshToken: $refreshToken) {
              token
              payload
              success
              errors
            }
          }
        `,
      variables: {
        refreshToken: q?.refreshToken,
      },
    },
  };
};
