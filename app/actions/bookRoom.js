"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

async function bookRoom(previousState, formdata) {

    const sessionCookie = (await cookies()).get('appwrite-session')
    if (!sessionCookie) {
        redirect('/login');
        }

    
    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        //get users id
        const { user } = await checkAuth();

        if (!user) {
            return {
                error: 'You must be logged in to book a room'
            }
        }

        //extract the date and time from the formData
        const checkInDate = formdata.get('check_in_date');
        const checkInTime = formdata.get('check_in_time');
        const checkOutDate = formdata.get('check_out_date');
        const checkOutTime = formdata.get('check_out_time');

        //Combine date and time from the formData
        const checkInDateTime = `${checkInDate}T${checkInTime}`;
        const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;


        const bookingData = {
            check_in: checkInDateTime,
            check_out: checkOutDateTime,
            user_id: user.id,
            room_id: formdata.get('room_id')
        }

        //create booking
        const newBooking = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
            ID.unique(),
            bookingData
        );

        //revalidatePath
        revalidatePath('/bookings', 'layout');
        return {
            success: true
        }

    } catch (error) {
        console.log("Failed to book room", error)
        return {
            error: 'Something went wrong while booking the room'
        }
    }
}

export default bookRoom;