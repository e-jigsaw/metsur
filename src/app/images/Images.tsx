"use client";

import { Image as ImageType } from "@prisma/client";
import { Envelope, fetcher } from "lib/fetcher";
import useSwr from "swr";
import { Image } from "./Image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { Nav } from "./Nav";

export const Take = 20;

export const Images = () => {
  const search = useSearchParams();
  const skip = useMemo(() => parseInt(search?.get("skip") ?? "0"), [search]);
  const { data, mutate } = useSwr<Envelope<ImageType[]>>(
    `/api/images/list?skip=${skip}&take=${Take}`,
    fetcher
  );
  return (
    <div>
      <Nav></Nav>
      <div className="grid grid-cols-5 gap-2">
        {data?.payload.map((image) => (
          <Image key={image.id} image={image} mutate={mutate}></Image>
        ))}
      </div>
      <Nav></Nav>
    </div>
  );
};
