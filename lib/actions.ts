"use server";

import { cookies } from "next/headers";

export async function userSelection({
  userId,
  age,
  gender,
  from,
  to,
  category,
}: {
  userId: string;
  age?: string | null;
  gender?: string | null;
  from?: Date | null;
  to?: Date | null;
  category?: string | null;
}) {
  const cookieStore = cookies();

  if (age) {
    cookieStore.set(`age-${userId}`, age, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
  }
  if (gender) {
    cookieStore.set(`gender-${userId}`, gender, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
  }
  if (from && to) {
    cookieStore.set(`from-${userId}`, from.toISOString(), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
    cookieStore.set(`to-${userId}`, to.toISOString(), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
  }
  if (category) {
    cookieStore.set(`category-${userId}`, category, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
  }

  if (from === null && to === null) {
    cookieStore.delete(`from-${userId}`);
    cookieStore.delete(`to-${userId}`);
  }
  if (age === null) {
    cookieStore.delete(`age-${userId}`);
  }
  if (gender === null) {
    cookieStore.delete(`gender-${userId}`);
  }
  if (category === null) {
    cookieStore.delete(`category-${userId}`);
  }
}
