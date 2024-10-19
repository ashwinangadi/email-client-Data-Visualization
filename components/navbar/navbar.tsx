import { signOut } from "@/auth";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-between px-10 fixed top-0 left-0 right-0 gap-4 bg-gray-200 h-14 z-50">
      <Link href="/">
        <HomeIcon />
      </Link>
      {!session?.user ? (
        <Link href={`/login`}>
          <Button variant={"secondary"}>Login</Button>
        </Link>
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant={"outline"} className="w-full  text-left font-normal">
            {" "}
            Logout
          </Button>
        </form>
      )}
    </div>
  );
};

export default Navbar;
