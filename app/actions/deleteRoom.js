"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { revalidatePath } from "next/cache";


async function deleteRoom(roomId) {

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

        //find room to delete
        const roomToDelete = rooms.find((room) => room.$id === roomId);

        //delete the room
        if (roomToDelete) {
            await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
                roomToDelete.$id
            );

            //revalidate my rooms and all rooms

            revalidatePath('/rooms/my', 'layout');
            revalidatePath('/', 'layout');

            return{
                success: true
            }
        } else {
            return{
                error: 'Room not Found',
            }
        }
        
        
    } catch (error) {
        console.log("Failed to delete rooms", error)
        return {
            error: 'Failed to Delete room',
        }
    }
}

export default deleteRoom;