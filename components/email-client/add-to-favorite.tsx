"use client";

import { useEmailState } from "@/store/email-state-store";
import React from "react";
import { toast } from "sonner";

const AddToFavorite = ({ id }: { id: string }) => {
  const { favorites, toggleFavoriteEmail } = useEmailState();
  const isFavorite = favorites.includes(id);
  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFavoriteEmail(id);
    if (!isFavorite) {
      toast.success("Email added to favorites");
    } else {
      toast.success("Email removed from favorites");
    }
  };
  return (
    <p
      onClick={handleFavoriteClick}
      className="bg-primary text-white font-bold cursor-pointer text-sm  px-5 py-1 rounded-full"
    >
      {isFavorite ? "Unfavorite" : "Mark as favorite"}
    </p>
  );
};

export default AddToFavorite;
