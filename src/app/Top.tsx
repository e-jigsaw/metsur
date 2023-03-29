"use client";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { Uploader } from "./Uploader";

export const Top = () => {
  return (
    <SessionProvider>
      <Inner></Inner>
    </SessionProvider>
  );
};

const Inner = () => {
  const { status } = useSession();
  if (status === "authenticated") {
    return (
      <div>
        <Uploader></Uploader>
        <div>
          <Link href="/settings">settings</Link>
        </div>
      </div>
    );
  }
  if (status === "unauthenticated") {
    return <a href="/signin">sign in</a>;
  }
  return <div>loading...</div>;
};
