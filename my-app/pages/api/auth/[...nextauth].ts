import NextAuth, { NextAuthOptions, Session } from "next-auth";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import EmailProvider from "next-auth/providers/email";
import clientPromise from "../../../utils/mongoDBClient";
import { sendVerificationRequest } from "../../../utils/sendVerificationRequest";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.SECRET,
  callbacks: {
    session({ session, token, user }) {
      let result: Session & { user: { id: string } } = {
        ...session,
        user: {
          ...session.user,
          ...user,
        },
      };
      return result;
    },
  },
};
export default NextAuth(authOptions);
