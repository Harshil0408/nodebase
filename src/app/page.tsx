import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import React from "react";

const page = async () => {
  await requireAuth();

  const data = await caller.getUsers();

  console.log("data", data);

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Protected Server Component
    </div>
  );
};

export default page;
