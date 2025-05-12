import { NextResponse } from "next/server";
import checkAuth from "./app/actions/checkAuth";


export async function middleware(request) {
    
    const {isAunthenticated} = await checkAuth();
    if (!isAunthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
        }

    return NextResponse.next();
}

export const config = {
    matcher: ['/bookings']
}