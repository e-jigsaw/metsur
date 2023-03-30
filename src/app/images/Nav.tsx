"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { Take } from "./Images";

export const Nav = () => {
  const search = useSearchParams();
  const skip = useMemo(() => parseInt(search?.get("skip") ?? "0"), [search]);
  return (
    <div className="flex justify-center gap-4 mb-2">
      {skip > 0 && (
        <Link href={`/images?skip=${skip - Take}`}>
          <button className="p-1 border text-4xl">prev</button>
        </Link>
      )}
      <Link href={`/images?skip=${skip + Take}`}>
        <button className="p-1 border text-4xl">next</button>
      </Link>
    </div>
  );
};
