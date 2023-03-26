"use client";
import { SessionProvider, useSession } from "next-auth/react";

export const Top = () => {
  return (
    <SessionProvider>
      <Inner></Inner>
    </SessionProvider>
  );
};

const Inner = () => {
  const { data, status } = useSession();
  console.log(data, status);
  return null;
};
