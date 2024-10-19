import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex fixed top-0 left-0 right-0 items-center justify-center gap-4 bg-gray-200 h-14 z-50">
      <Link href="/">
        <HomeIcon />
      </Link>
    </div>
  );
};

export default Navbar;
