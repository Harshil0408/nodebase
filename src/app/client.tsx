"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const Client = () => {
  const trpc = useTRPC();

  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());

  return <pre>{JSON.stringify(users, null, 4)}</pre>;
};

export default Client;
