import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signInSchema } from "@/lib/zod";
import { getUser } from "@/lib/authActions";
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers';
// import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = bcrypt.compareSync(password, user.password);

          if (passwordsMatch) {
            revalidatePath("/cart");
            // Set user-specific cookies
            const cookieStore = cookies();
            cookieStore.set('userId', user.id, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 7, // One week
              path: '/',
            });
            // Set other cookies as needed
            return user;
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Default login page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // const isOnRootPage = nextUrl.pathname === "/"; // Check if on root page
      const callbackUrl =
        nextUrl.searchParams.get("callbackUrl") || nextUrl.href; // Use full URL with params

      const ProtectedRoutes = ["/datavisualization"];

      if (ProtectedRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
        const loginUrl = new URL(`/login`, nextUrl);
        loginUrl.searchParams.set("callbackUrl", callbackUrl); // Store full URL as callbackUrl
        return NextResponse.redirect(loginUrl);
      }

      return true;
    },
  },
});
