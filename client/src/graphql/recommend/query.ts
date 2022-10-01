export const gql = (q: any) => {
  return {
    collaborateFiltering: {
      query: `query collaborateFiltering {
                collaborateFiltering{
                    email
                    probability
                    fullName
                }
            }
          `,
    },

    contentFiltering: {
      query: `query contentFiltering($email: String!) {
                contentFiltering(email: $email){
                    email
                    probability
                    fullName
                }
            }
          `,
      variables: {
        email: q?.email,
      },
    },
  };
};
