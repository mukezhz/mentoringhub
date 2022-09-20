export const gql = (q: any) => {
  return {
    login: {
      query: `mutation tokenAuth($email: String!, $password: String!){
                 tokenAuth(email: $email, password: $password) {
                   token
                   success
                   errors
                   refreshToken
                 }
               }
              `,
      variables: { email: q?.email, password: q?.password },
    },

    register: {
      query: `mutation registerMe($email: String!, $password1:String!, $password2:String!){
              register(email: $email, password1:$password1, password2: $password2, username: $email){
                errors
                success
                refreshToken
                token
              }
          }`,
      variables: {
        email: q?.email,
        password1: q?.password1,
        password2: q?.password2,
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
