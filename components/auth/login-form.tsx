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
import { signInSchema } from "@/lib/zod";
import { ArrowRight, Loader, TriangleAlert } from "lucide-react";
import { authenticate } from "@/lib/authActions";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import AuthRouting from "./auth-routing";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  // console.log("searchParams________________",searchParams.get("callbackUrl"));

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await authenticate({ params: callbackUrl, values });
      if (result?.message) {
        form.setError("root", {
          type: "manual",
          message: result.message,
        });
        toast.error(result.message);
      } else {
        toast.success("Login successful!");
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-1 gap-5">
      <span className="text-center text-sm bg-yellow-50 w-full p-4 border rounded-md">
        <p className="text-base font-bold mb-2">Dummy Credentials</p>
        <p
          onClick={() => form.setValue("email", "john@example.com")}
          className="cursor-pointer hover:underline"
        >
          email: john@example.com
        </p>
        <p
          onClick={() => form.setValue("password", "password123")}
          className="cursor-pointer hover:underline"
        >
          password: password123
        </p>
      </span>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center ">
            Login
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
                    Logging In...
                  </span>
                ) : (
                  <>
                    <span className="flex items-center justify-between w-full">
                      <p>Login</p> <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </>
                )}
              </Button>
            </form>
          </Form>
          <div>
            <AuthRouting
              message="Don't have an account yet?"
              routeTo="/signup"
              routeMessage="Sign Up here"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
