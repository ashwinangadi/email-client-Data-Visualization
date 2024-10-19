"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { signInSchema, signUpSchema } from "./zod";

import User from "@/models/userModel";
import { connectToMongoDB } from "./db";
import bcrypt from "bcryptjs";
import { z } from "zod";

//____________________________________________________________________AUTHENTICATION START______________________________________________________________________

// Function to authenticate a user
export async function authenticate({
  params,
  values,
}: {
  params?: string | null;
  values: { email: string; password: string };
}) {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const redirectTo = params ?? "/";
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", { email, password, redirectTo: redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: `Something went wrong. ${error}`,
          };
      }
    }
    throw error;
  }
}

//____________________________________________________________________AUTHENTICATION END______________________________________________________________________

//____________________________________________________________________USER MANAGEMENT START___________________________________________________________________

// Function to create a new user
export const createUser = async (values: z.infer<typeof signUpSchema>) => {
  try {
    await connectToMongoDB();

    const { username, email, password, picture } = values;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hash,
      picture,
    });
    const savedUser = await newUser.save();

    // Return a plain object representation of the user
    return {
      success: true,
      user: {
        _id: savedUser?._id?.toString(),
        username: savedUser.username,
        email: savedUser.email,
        picture: savedUser.picture,
        isVerified: savedUser.isVerified,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 11000) {
      if (error.keyPattern.username) {
        return { success: false, error: "Username already exists" };
      }
      if (error.keyPattern.email) {
        return { success: false, error: "Email already exists" };
      }
      return { success: false, error: "Duplicate key error" };
    }
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err: any) => err.message
      );
      return { success: false, error: validationErrors };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Function to delete a user
export const deleteUser = async (id: FormData) => {
  await connectToMongoDB();

  // Extracting user ID from formData
  const userId = id.get("id");

  try {
    // Deleting the user with the specified ID
    await User.deleteOne({ _id: userId });

    // Triggering revalidation of the specified path ("/")
    // revalidatePath("/signup");

    // Returning a success message after deleting the user
    return "user deleted";
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { message: "error deleting user" };
  }
};

// Function to get a user by email
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUser(email: string): Promise<any | undefined> {
  await connectToMongoDB();
//   console.log("getUser", email);
  try {
    const user = await User.findOne({ email });
    // console.log("user", user);

    if (!user) {
      return null;
    }

    if (email === user.email) {
      return user;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

// Function to get a user by email in the client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUserInClient(email: string): Promise<any | undefined> {
  await connectToMongoDB();
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    if (email === user.email) {
      return { email: user.email, _id: user._id, success: true };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Failed to fetch user.", status: 500 };
  }
}

//____________________________________________________________________USER MANAGEMENT END___________________________________________________________________
