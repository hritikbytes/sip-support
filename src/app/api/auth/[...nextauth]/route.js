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
    async signIn({ user, account, profile }) {
      try {
        const userEmail =
          user?.email ||
          profile?.email ||
          (profile?.login
            ? `${profile.login}@users.noreply.github.com`
            : user?.id
            ? `${user.id}@github.noreply`
            : null);

        if (!userEmail) {
          console.error("Sign-in failed: No email found for user", user);
          return false;
        }

        user.email = userEmail;

        await connectDb();
        const currentUser = await User.findOne({ email: userEmail });
        if (!currentUser) {
          const baseUsername =
            profile?.login ||
            (user.name ? user.name.replace(/\s+/g, "").toLowerCase() : "") ||
            userEmail.split("@")[0];
          const cleanUsername = baseUsername.replace(/[^a-zA-Z0-9]/g, "") || `user_${Date.now().toString().slice(-4)}`;

          const existingUsername = await User.findOne({ username: cleanUsername });
          const finalUsername = existingUsername ? `${cleanUsername}_${Date.now().toString().slice(-4)}` : cleanUsername;

          const newUser = new User({
            email: userEmail,
            username: finalUsername,
            name: user.name || profile?.name || profile?.login || finalUsername,
            profilePicture: user.image || profile?.avatar_url || "",
          });
          await newUser.save();
        }
        return true;
      } catch (err) {
        console.error("CRITICAL: Error in signIn callback (check MONGODB_URI and Network Access):", err);
        return false;
      }

    },
    async session({ session }) {
      try {
        if (session?.user?.email) {
          await connectDb();
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            session.user.name = dbUser.name;
            session.user.username = dbUser.username;
            session.user.image = dbUser.profilePicture || session.user.image;
          }
        }
      } catch (err) {
        console.error("Error in session callback:", err);
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
