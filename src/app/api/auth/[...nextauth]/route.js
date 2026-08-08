import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/User";
import connectDb from "@/app/lib/db";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user?.email) {
        await connectDb();
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          const username = user.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
          const newUser = new User({
            email: user.email,
            username: username,
            name: user.name || username,
            profilePicture: user.image || "",
          });
          await newUser.save();
        }
        return true;
      }
      return false;
    },
    async session({ session }) {
      if (session?.user?.email) {
        await connectDb();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.name;
          session.user.username = dbUser.username;
          session.user.image = dbUser.profilePicture || session.user.image;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
