"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { emailListOptions } from "@/lib/emailActions";
import EmailCard from "./email-card";
import { Email } from "@/lib/types";
import { useEmailState } from "@/store/email-state-store";
import { useSearchParams } from "next/navigation";
import EmailPagination from "./email-pagination";

const EmailsList = () => {
  const searchParams = useSearchParams();
  const paginate = Number(searchParams.get("page")) || 1;
  const { data } = useSuspenseQuery(emailListOptions(Number(paginate)));
  const { read, favorites } = useEmailState();

  const readEmails = read;
  const favoriteEmails = favorites;

  const unreadEmailList = data?.list?.filter(
    (email: Email) => !readEmails.includes(email.id)
  );
  const readEmailList = data?.list?.filter((email: Email) =>
    readEmails.includes(email.id)
  );
  const favoriteEmailList = data?.list?.filter((email: Email) =>
    favoriteEmails.includes(email.id)
  );

  return (
    <Tabs defaultValue="all" className=" ">
      <span className="flex items-center gap-2">
        <p>Filters: </p>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </span>
      <TabsContent value="all" className="">
        <div className="flex flex-col gap-6 h-[85vh] overflow-auto">
          {data?.list?.map((email: Email) => (
            <EmailCard key={email.id} {...email} />
          ))}
        </div>
        {data?.list && (
          <EmailPagination totalEmails={data?.total} paginate={paginate} />
        )}
      </TabsContent>
      <TabsContent value="unread" className="">
        <div className="flex flex-col gap-6 h-[90vh] overflow-auto">
          {unreadEmailList?.length > 0 ? (
            unreadEmailList?.map((email: Email) => (
              <EmailCard key={email.id} {...email} />
            ))
          ) : (
            <p className="text-center font-bold text-lg text-muted-foreground mt-20">
              No unread emails!
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="read">
        <div className="flex flex-col gap-6 h-[90vh] overflow-auto">
          {readEmailList?.length > 0 ? (
            readEmailList?.map((email: Email) => (
              <EmailCard key={email.id} {...email} />
            ))
          ) : (
            <p className="text-center font-bold text-lg text-muted-foreground mt-20">
              No read emails!
            </p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="favorites">
        {" "}
        <div className="flex flex-col gap-6 h-[90vh] overflow-auto">
          {favoriteEmailList?.length > 0 ? (
            favoriteEmailList?.map((email: Email) => (
              <EmailCard key={email.id} {...email} />
            ))
          ) : (
            <p className="text-center font-bold text-lg text-muted-foreground mt-20">
              No favorite emails!
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default EmailsList;
