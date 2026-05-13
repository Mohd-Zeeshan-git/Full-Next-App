import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse, userAgent } from "next/server";
//in next js we need to specifically tell the request like post get etc not any other name because it will serve as routes are alredy build using folders
export async function POST(request:NextRequest){
    try {
        // in next js getting data takes time not like as express where you can get data from req.body
        const {email,password}= await request.json()
        if(!email || !password){
            return NextResponse.json(
                {   error:"Email and password are required" },
                {status:400 }
            )
        }
    //in nextjs db are run in edges so you dont know if db is connected or not so we need to check that
        await connectToDatabase;
        const existingUser= await User.findOne({email})
        if(existingUser){
            return NextResponse.json(
                {   error:"User already registerd" },
                {status:400 }
            )
        }

        User.create({
            email,
            password
        })

        return NextResponse.json(
                {   message:"User registration successfully completed" },
                {status:200 }
            )
    } catch (error) {
        console.error("registration error",error);
        
        return NextResponse.json(
                {   error:"Failed to register user" },
                {status:400 }
            )
    }

}
