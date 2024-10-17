"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { emailBodyOptions } from "@/lib/emailActions";
import { emailListOptions } from "@/lib/emailActions";
import AddToFavorite from "./add-to-favorite";
import { Email } from "@/lib/types";

const EmailBody = ({ id, page }: { id: string; page: number }) => {
  const { data: bodyData, isLoading: bodyLoading } = useSuspenseQuery(
    emailBodyOptions(id)
  );

  const { data: emailData } = useSuspenseQuery(
    emailListOptions(Number(page) || 1)
  );
  const email = emailData?.list?.find((email: Email) => email.id === id);
  return (
    <Card
      className={`group flex-col items-start rounded-none lg:rounded-xl hover:shadow-lg hover:shadow-primary/20 hover:duration-300 text-sm h-[70vh] lg:h-[90vh] p-6 `}
    >
      <CardHeader className="flex-row items-start justify-between gap-2 p-0">
        <div className="flex items-center gap-2">
          <Avatar className="me-3 mb-5">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-white">
              {email?.from.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="flex-col w-full">
            <CardTitle>{email?.from.name}</CardTitle>
            <CardDescription className="mt-5">{email?.subject}</CardDescription>
          </span>
        </div>
        <AddToFavorite id={id} />
      </CardHeader>
      {bodyLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader className="animate-spin h-10 w-10" />
        </div>
      ) : (
        <CardContent
          className="w-full ms-9 mt-5 text-base font-medium text-textColor h-[calc(100%-70px)] overflow-auto"
          dangerouslySetInnerHTML={{ __html: bodyData?.body }}
        />
      )}
    </Card>
  );
};

export default EmailBody;
