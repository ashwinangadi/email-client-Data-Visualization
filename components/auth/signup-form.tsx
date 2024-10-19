"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/zod";
import { ArrowRight, Loader, TriangleAlert } from "lucide-react";
import { createUser } from "@/lib/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthRouting from "./auth-routing";
export function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const result = await createUser(values);

      if (result.success) {
        const res = new Promise((resolve) => {
          setTimeout(() => {
            resolve("success");
          }, 100);
        });
        toast.promise(res, {
          loading: "Creating account...",
          success: () => {
            setTimeout(() => {
              router.push("/login"); // Redirect to login page after 5 seconds
            }, 4000);
            return `Account created successfully! Redirecting to login page in 4 seconds...`;
          },
          error: "Something went wrong!",
        });
      } else {
        // Handle specific error cases
        if (result.error === "Email already exists") {
          form.setError("email", {
            type: "manual",
            message: "This email is already registered.",
          });
        } else if (result.error === "Username already exists") {
          form.setError("username", {
            type: "manual",
            message: "This username is already taken.",
          });
        } else {
          toast.error(
            result?.error || "An unexpected error occurred. Please try again."
          );
          form.setError("root", {
            type: "manual",
            message:
              (Array.isArray(result?.error)
                ? result?.error[0]
                : result?.error) ||
              "An unexpected error occurred. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An unexpected error occurred. Please try again.");
      form.setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-1 gap-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center ">
            Signup
          </CardTitle>
        </CardHeader>
        <CardContent>
          {form.formState.errors.root && (
            <div
              className="flex w-full items-center p-4 mb-4 gap-2 text-sm text-red-800 rounded-lg bg-red-100"
              role="alert"
            >
              <TriangleAlert className="h-4 w-4 text-red-500" />
              <span className="sr-only">Error</span>
              <div>{form.formState.errors.root.message}</div>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="username"
                        placeholder="Enter username"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="confirmPassword"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  form.formState.isSubmitSuccessful
                }
                className="w-full mt-4"
              >
                {form.formState.isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Signing up...
                  </span>
                ) : (
                  <>
                    <span className="flex items-center justify-between w-full">
                      <p>Signup</p> <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </>
                )}
              </Button>
            </form>
          </Form>
          <AuthRouting
            message="Do you have an account ?"
            routeTo="/login"
            routeMessage="Login here"
          />
        </CardContent>
      </Card>
    </div>
  );
}
