// import AcmeLogo from '@/app/ui/acme-logo';

import { LoginForm } from "@/components/auth/login-form";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <section className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[450px] flex-col space-y-2.5 md:-mt-32">
        <Suspense fallback={<Loader className="w-5 h-5 animate-spin" />}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
