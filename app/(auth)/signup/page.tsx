import { SignupForm } from "@/components/auth/signup-form";
import React from "react";

const SignupPage = () => {
  return (
    <section className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[450px] flex-col space-y-2.5 md:-mt-32">
        <SignupForm />
      </div>
    </section>
  );
};

export default SignupPage;
