"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { Take } from "./Tags";

export const Nav: React.FC<{ name: string }> = ({ name }) => {
  const search = useSearchParams();
  const skip = useMemo(() => parseInt(search?.get("skip") ?? "0"), [search]);
  return (
    <div className="flex justify-center gap-4 mb-2">
      {skip > 0 && (
        <Link href={`/tags/${name}?skip=${skip - Take}`}>
          <button className="p-1 border text-4xl">prev</button>
        </Link>
      )}
      <Link href={`/tags/${name}?skip=${skip + Take}`}>
        <button className="p-1 border text-4xl">next</button>
      </Link>
    </div>
  );
};
