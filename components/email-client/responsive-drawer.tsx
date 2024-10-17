"use client";

// import { dehydrate, QueryClient } from "@tanstack/react-query";
import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
// import { HydrationBoundary } from "@tanstack/react-query";
import EmailBody from "./email-body";
import { useDrawerState } from "@/store/drawer-store";

const ResponsiveDrawer = ({
  //   emailBodyQueryClient,
  Id,
  Page,
}: {
  //   emailBodyQueryClient: QueryClient;
  //   searchParams: { Id?: string; page?: number };
  Id: string;
  Page: number;
}) => {

  const { isDrawerOpen, toggleDrawer } = useDrawerState();
  return (
    <span className="lg:hidden">
      <Drawer open={isDrawerOpen} onOpenChange={toggleDrawer}>
        <DrawerContent>
          {/* <HydrationBoundary state={dehydrate(emailBodyQueryClient)}> */}
          <EmailBody id={Id ?? ""} page={Number(Page ?? 1)} />
          {/* </HydrationBoundary> */}
        </DrawerContent>
      </Drawer>
    </span>
  );
};

export default ResponsiveDrawer;
