"use client";

import { Envelope, fetcher } from "lib/fetcher";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSwr from "swr";
import { Image as ImageType } from "@prisma/client";
import { useKey } from "react-use";

export const Take = 1;

export const Image = () => {
  const router = useRouter();
  const search = useSearchParams();
  const skip = useMemo(() => parseInt(search?.get("skip") ?? "0"), [search]);
  const { data } = useSwr<Envelope<ImageType[]>>(
    `/api/images/list?skip=${skip}&take=${Take}&rate=true`,
    fetcher
  );
  const [query, setQuery] = useState("");
  const queryHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setQuery(event.currentTarget.value);
    },
    []
  );
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    if (data) {
      setTags(data.payload[0].tags);
    }
  }, [data]);
  const [dic, setDic] = useState<Set<string>>(new Set());
  const createHandler = useCallback(() => {
    const next = dic.add(query);
    setDic(next);
    setTags([...tags, query]);
    setQuery("");
  }, [query, dic]);
  const saveHandler = useCallback(async () => {
    if (data) {
      const res = await fetch("/api/images/tags", {
        method: "PATCH",
        body: JSON.stringify({
          id: data.payload[0].id,
          tags,
        }),
      });
      const json = await res.json();
      localStorage.setItem("queries", JSON.stringify(Array.from(dic)));
      router.push(`/images/detail?skip=${skip + 1}`);
    }
  }, [tags, dic, data, router]);
  useEffect(() => {
    const queriesRaw = localStorage.getItem("queries");
    if (queriesRaw) {
      const candidate = JSON.parse(queriesRaw);
      setDic(new Set(candidate));
    }
  }, []);
  const ref = useRef<HTMLInputElement>(null);
  useKey("f", (event) => {
    if (event.metaKey) {
      event.preventDefault();
      ref.current?.focus();
    }
  });
  useKey(
    "s",
    (event) => {
      if (event.metaKey) {
        event.preventDefault();
        saveHandler();
      }
    },
    undefined,
    [saveHandler]
  );
  const suggestHandler = useCallback(
    (key: string) => () => {
      setTags([...tags, key]);
      setQuery("");
    },
    [tags]
  );
  useKey(
    "Enter",
    (event) => {
      if (event.metaKey) {
        event.preventDefault();
        router.push(`/images/detail?skip=${skip + 1}`);
      }
    },
    undefined,
    [router, skip]
  );
  useKey(
    "p",
    (event) => {
      if (event.metaKey) {
        event.preventDefault();
        router.push(`/images/detail?skip=${skip - 1}`);
      }
    },
    undefined,
    [router, skip]
  );
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div className="text-center">
        <button className="border text-2xl p-1" onClick={saveHandler}>
          save
        </button>
      </div>
      <img
        src={`${process.env.NEXT_PUBLIC_PICSUR_ENDPOINT}/i/${data?.payload[0].picsurId}.webp`}
        className="max-w-full max-h-[80vh] mx-auto"
      ></img>
      <div className="text-center mt-2">
        <input
          value={query}
          onChange={queryHandler}
          className="border text-4xl"
          ref={ref}
        ></input>
        <div>
          {query.length > 0 && (
            <button onClick={createHandler}>create {query}</button>
          )}
          {Array.from(dic).map((q) => (
            <button key={q} className="mx-2" onClick={suggestHandler(q)}>
              {q}
            </button>
          ))}
        </div>
      </div>
      <div>{tags.join(",")}</div>
    </div>
  );
};
