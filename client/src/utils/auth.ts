import { gql } from "./queries"
class Auth {
    private url = import.meta.env.VITE_API_URL

    public async login(email: string, password: string) {
        console.log({ query: `${gql({ email, password }).login}` })
        return await fetch(this.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `${gql({ email, password }).login}` }),
        })

    }
}

export const auth = new Auth()
