export const gql = (q: any) => {
  return {
    isVerified: {
      query: `query {
                me {
                  id
                  verified
                }
              }
                `,
    },
    resendEmail: {
      query: `mutation resendActivationEmail($email: String!){
                resendActivationEmail(email: $email){
                  errors
                  success
                }
            }`,
      variables: {
        email: q?.email,
      },
    },
    activateAccount: {
      query: `mutation verifyAccount($token: String!){
                verifyAccount(token: $token){
                  errors
                  success
                }
            }`,
      variables: {
        token: q?.token,
      },
    },
  };
};
