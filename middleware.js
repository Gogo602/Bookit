import { NextResponse } from "next/server";


export async function middleware(request) {
    
    const isAunthenticated = false;
    if (!isAunthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
        }

    return NextResponse.next();
}

export const config = {
    matcher: ['/bookings']
}