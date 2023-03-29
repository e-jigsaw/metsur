"use client";
import { MetsurApiKey } from "@prisma/client";
import { fetcher, Envelope } from "lib/fetcher";
import useSwr from "swr";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const KeyManager = () => {
  const router = useRouter();
  const { data } = useSwr<Envelope<MetsurApiKey[]>>("/api/meta/list", fetcher);
  const create = useCallback(async () => {
    const res = await fetch("/api/meta/new");
    const json = await res.json();
    if (json.ok) {
      router.refresh();
    }
  }, []);
  return (
    <div>
      <div>
        {data?.payload.map(({ key }) => (
          <div key={key}>{key}</div>
        ))}
      </div>
      <button onClick={create}>create</button>
    </div>
  );
};
