"use client";

import { Image as ImageType } from "@prisma/client";
import { Envelope, fetcher } from "lib/fetcher";
import useSwr from "swr";
import { Image } from "./Image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";

const Take = 20;

export const Images = () => {
  const search = useSearchParams();
  const skip = useMemo(() => parseInt(search?.get("skip") ?? "0"), [search]);
  const { data } = useSwr<Envelope<ImageType[]>>(
    `/api/images/list?skip=${skip}&take=${Take}`,
    fetcher
  );
  return (
    <div>
      <div>
        {skip > 0 && (
          <Link href={`/images?skip=${skip - Take}`}>
            <button className="p-1 border">prev</button>
          </Link>
        )}
        <Link href={`/images?skip=${skip + Take}`}>
          <button className="p-1 border">next</button>
        </Link>
      </div>
      <div className="grid grid-cols-5">
        {data?.payload.map((image) => (
          <Image key={image.id} image={image}></Image>
        ))}
      </div>
    </div>
  );
};
