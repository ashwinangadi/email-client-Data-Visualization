import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin h-10 w-10 text-primary" />
    </div>
  );
};

export default Loading;
