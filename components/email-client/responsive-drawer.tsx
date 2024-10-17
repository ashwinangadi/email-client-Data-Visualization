"use client";
import React from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import EmailBody from "./email-body";
import { useDrawerState } from "@/store/drawer-store";

const ResponsiveDrawer = ({ Id, Page }: { Id: string; Page: number }) => {
  const { isDrawerOpen, toggleDrawer } = useDrawerState();
  return (
    <Drawer open={isDrawerOpen} onOpenChange={toggleDrawer}>
      <DrawerTitle className="hidden">Email</DrawerTitle>
      <DrawerContent aria-describedby="email-description">
        <div id="email-description" className="sr-only">
          This section contains the email body content.
        </div>
        <EmailBody id={Id ?? ""} page={Number(Page ?? 1)} />
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDrawer;
