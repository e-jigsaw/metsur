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
      <div className="pt-2">
        <div className="flex justify-center text-xl gap-6">
          <Link href="/images" className="border border-solid p-1">
            images
          </Link>
          <Link href="/images?rate=true" className="border border-solid p-1">
            images by rate
          </Link>
          <Link href="/images/detail" className="border border-solid p-1">
            tagging
          </Link>
        </div>
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
