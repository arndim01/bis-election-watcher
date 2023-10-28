import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){

    const url = req.nextUrl.clone();
    const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;
    if( session ){
        if( pathname === '/login'){
            url.pathname = "/";
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    if( !session && pathname !== '/login'){
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}


export const config = {
    matcher: [
        "/",
        "/tally",
        "/profile",
        "/account",
        "/checker",
        "/login",
    ]
}