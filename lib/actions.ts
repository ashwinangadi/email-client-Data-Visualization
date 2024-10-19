"use server";

import { cookies } from "next/headers";

export async function userSelection({
  age,
  gender,
  from,
  to,
}: {
  age?: string;
  gender?: string;
  from?: Date;
  to?: Date;
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

  if (from === undefined && to === undefined) {
    cookies().delete("from");
    cookies().delete("to");
  }
}
