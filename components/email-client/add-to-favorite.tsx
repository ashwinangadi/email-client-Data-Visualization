"use client";

import { useEmailState } from "@/store/email-state-store";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

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
    <Button
      onClick={handleFavoriteClick}
      className=" font-bold cursor-pointer text-sm rounded-full"
    >
      {isFavorite ? "Unfavorite" : "Mark as favorite"}
    </Button>
  );
};

export default AddToFavorite;
