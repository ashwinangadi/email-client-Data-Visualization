import Link from "next/link";
import React from "react";

const AuthRouting = ({
  message,
  routeTo,
  routeMessage,
}: {
  message: string;
  routeTo: string;
  routeMessage: string;
}) => {
  return (
    <p className="text-sm font-light text-gray-500 mt-1">
      {message}
      <Link href={routeTo}>
        <span className="hover:underline font-medium pl-1 text-blue-600 hover:text-blue-700">
          {routeMessage}
        </span>
      </Link>
    </p>
  );
};

export default AuthRouting;
