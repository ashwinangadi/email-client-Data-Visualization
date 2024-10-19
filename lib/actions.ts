"use server";

import { cookies } from "next/headers";

export async function userSelection({
  age,
  gender,
  from,
  to,
  category,
}: {
  age?: string | null;
  gender?: string | null;
  from?: Date | null;
  to?: Date | null;
  category?: string | null;
}) {
  if (age) {
    cookies().set("age", age, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
  }
  if (gender) {
    cookies().set("gender", gender, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
  }
  if (from && to) {
    cookies().set("from", from.toISOString(), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
    cookies().set("to", to.toISOString(), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
  }
  if (category) {
    cookies().set("category", category, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
    });
  }

  if (from === null && to === null) {
    cookies().delete("from");
    cookies().delete("to");
  }
  if (age === null) {
    cookies().delete("age");
  }
  if (gender === null) {
    cookies().delete("gender");
  }
  if (category === null) {
    cookies().delete("category");
  }
}
