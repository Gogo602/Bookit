"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";


async function getMyRooms() {

    const sessionCookie = (await cookies()).get('appwrite-session')
    if (!sessionCookie) {
        redirect('/login');
        }

    
    try {
        const { databases, account } = await createSessionClient(sessionCookie.value);

        //get users id
        const user = await account.get();
        const userId = user.$id;

        //fetch users rooms
        const { documents: rooms } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            [Query.equal('user_id', userId)]
        );

        //revalidate the caceh for this path
        // revalidatePath('/', 'layout');

        return rooms;
    } catch (error) {
        console.log("Failed to get user rooms", error)
        redirect('/error')
    }
}

export default getMyRooms;