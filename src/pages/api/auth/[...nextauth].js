import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "user123"},
                password: { label: "Password", type: "password"}
            },
            authorize: async(credentials) => {

                const response = await fetch(`${publicRuntimeConfig.apiUrl}/authenticate`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if( response.status == 200 ){
                    const user = await response.json();
                    return { ...user };
                }else{
                    throw new Error('Username or password is incorrect.');
                }
            }
        })
    ],
    callbacks: {
        jwt: async( { token, user }) => {
            if( user ){
                token.user = user;
                token.accessToken = user.token;
                token.picture = user.photo_url
            }
            return Promise.resolve(token);
        },
        session: async({ session, token }) => {
            session.accessToken = token.accessToken;
            session.user.uid = token.user._id;
            session.user.email = token.user.email;
            session.user.fullname = token.user.fullname;
            session.user.role = token.user.role;
            session.user.type = token.user.type;
            session.user.precinct = token.user.precinct;
            session.user.party = token.user.party;
            session.user.username = token.user.username;
            session.user.image = token.picture;
            return Promise.resolve(session);
        }
    }

});