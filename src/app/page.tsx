import prisma from "@/lib/db";
import React from "react";

const page = async () => {
  const users = await prisma.user.findMany();

  return <pre>{JSON.stringify(users, null, 4)}</pre>;
};

export default page;
