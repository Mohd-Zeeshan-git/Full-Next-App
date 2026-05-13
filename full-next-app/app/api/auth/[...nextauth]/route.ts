import NextAuth from "next-auth";
import {authOptions} from "@/lib/auth";
//compulsary handler name
const handler =NextAuth(authOptions)

export {handler as GET , handler as POST}
