import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Email } from "@/lib/types";
import { useEmailState } from "@/store/email-state-store";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const EmailCard = ({ id, from, subject, short_description, date }: Email) => {
  const searchParams = useSearchParams();
  const paramId = searchParams.get("Id");
  const { replace } = useRouter();
  const pathname = usePathname();
  const { read, favorites, toggleFavoriteEmail, addReadEmail } =
    useEmailState();

  const isFavorite = favorites.includes(id);
  const isRead = read.includes(id);

  const handleCardClick = () => {
    addReadEmail(id);
    const params = new URLSearchParams(searchParams);
    params.set("Id", id.toString());
    const newURL = `${pathname}?${params.toString()}`;
    replace(newURL);
  };

  const convertedDate = new Date(date)
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");

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
    <Card
      onClick={handleCardClick}
      className={`flex group items-start hover:border hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:duration-300 text-sm ${
        isRead ? "bg-readBG" : null
      } ${paramId === id ? "border border-primary" : null}`}
    >
      <Avatar className="mx-3 my-2">
        <AvatarImage src="" />
        <AvatarFallback className="bg-primary text-white">
          {from.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <span>
        <CardHeader className="p-2.5">
          <CardTitle className="text-textColor">
            <span className="font-normal">From: </span>
            {from.name}
          </CardTitle>
          <CardDescription className="text-textColor font-extrabold">
            <span className="font-normal text-textColor">Subject: </span>
            {subject}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2.5 pb-2.5 line-clamp-1 leading-8">
          <p>{short_description}</p>
        </CardContent>
        <CardFooter className="flex items-center px-2.5 pb-2">
          <p suppressHydrationWarning>{convertedDate}</p>
          <p
            onClick={handleFavoriteClick}
            className="text-primary ms-5 font-bold cursor-pointer text-sm hidden group-hover:inline-flex"
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </p>
        </CardFooter>
      </span>
    </Card>
  );
};

export default EmailCard;
