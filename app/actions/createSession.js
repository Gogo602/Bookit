"use server"
import { createAdminClient } from "@/config/appwrite"
import { cookies } from "next/headers"

async function createSession(previousState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
        return {
            error: "please fill out all fields",
        }
    }

    //get account instance
    const { account } = await createAdminClient();
        try {
            //generate a session
            const session = await account.createEmailPasswordSession(email, password);

            //create cookies
            cookies().set('appwrite-session', session.secret, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                expires: new Date(session.expire),
                path: '/'
            });
            return {
                success: true,
            }
        } catch (error) {
            console.log(" Error: ", error);
            return {
                error: "Invalid credentials"
            }
        }

    
}

export default createSession;