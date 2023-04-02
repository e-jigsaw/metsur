"use client";

import { Envelope, fetcher } from "lib/fetcher";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import useSwr from "swr";
import { Image as ImageType } from "@prisma/client";
import Link from "next/link";
import { Nav } from "./Nav";

export const Take = 20;

export const Tags: React.FC<{ name: string }> = ({ name }) => {
  const search = useSearchParams();
  const skip = useMemo(() => parseInt(search?.get("skip") ?? "0"), [search]);
  const { data, mutate } = useSwr<Envelope<ImageType[]>>(
    `/api/images/by_tag?name=${name}&skip=${skip}&take=${Take}`,
    fetcher
  );
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="my-2 text-center text-4xl">{decodeURIComponent(name)}</h1>
      <Nav name={name}></Nav>
      <div className="grid grid-cols-5 gap-2">
        {data.payload.map((image) => (
          <div key={image.id}>
            <img
              src={`${process.env.NEXT_PUBLIC_PICSUR_ENDPOINT}/i/${image.picsurId}.webp`}
            ></img>
            <div className="mt-2">
              {image.tags.map((tag) => (
                <Link href={`/tags/${tag}`} key={`${image.id}-${tag}`}>
                  <button className="border px-2 mx-1">{tag}</button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Nav name={name}></Nav>
    </div>
  );
};
