export const gql = (q: any) => {
    return {
        login: `mutation tokenAuth{
                 tokenAuth(email: "${q?.email}", password: "${q.password}") {
                   token
                   success
                   errors
                 }
               }
              `
    }
}