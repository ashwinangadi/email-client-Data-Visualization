import React from "react";
import EmailsList from "@/components/email-client/email-list";
import EmailBody from "@/components/email-client/email-body";
import { emailBodyOptions, emailListOptions } from "@/lib/emailActions";
import { getQueryClient } from "@/providers/get-query-client";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";

const EmailClientPage = ({
  searchParams,
}: {
  searchParams: { Id?: string; page?: number };
}) => {
  const emailBodyQueryClient = getQueryClient();
  if (searchParams?.Id) {
    emailBodyQueryClient.prefetchQuery(emailBodyOptions(searchParams.Id));
  }

  const emailListQueryClient = getQueryClient();
  emailListQueryClient.prefetchQuery(emailListOptions(searchParams.page || 1));
  return (
    <section className="container grid gap-6 grid-cols-12 mx-auto mb-10">
      <span className={`col-span-12 mx-1 ${searchParams?.Id ? "lg:col-span-4" : "col-span-12"}`}>
        <HydrationBoundary state={dehydrate(emailListQueryClient)}>
          <EmailsList />
        </HydrationBoundary>
      </span>
      <span
        className={`col-span-8 mx-1 mt-11 ${searchParams?.Id ? "block" : "hidden"}`}
      >
        <HydrationBoundary state={dehydrate(emailBodyQueryClient)}>
          <EmailBody
            id={searchParams?.Id ?? ""}
            page={Number(searchParams?.page) ?? 1}
          />
        </HydrationBoundary>
      </span>
    </section>
  );
};

export default EmailClientPage;
