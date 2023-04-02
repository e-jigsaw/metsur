"use client";

import { Envelope, fetcher } from "lib/fetcher";
import useSwr from "swr";
import { Image as ImageType } from "@prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useKey } from "react-use";

export const Image: React.FC<{ id: string }> = ({ id }) => {
  const { data } = useSwr<Envelope<ImageType>>(
    `/api/images/by_id?id=${id}`,
    fetcher
  );
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    if (data) {
      setTags(data.payload.tags);
    }
  }, [data]);
  const [query, setQuery] = useState("");
  const queryHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setQuery(event.currentTarget.value);
    },
    []
  );
  const ref = useRef<HTMLInputElement>(null);
  useKey("f", (event) => {
    if (event.metaKey) {
      event.preventDefault();
      ref.current?.focus();
    }
  });
  const [dic, setDic] = useState<Set<string>>(new Set());
  useEffect(() => {
    const queriesRaw = localStorage.getItem("queries");
    if (queriesRaw) {
      const candidate = JSON.parse(queriesRaw);
      setDic(new Set(candidate));
    }
  }, []);
  const createHandler = useCallback(() => {
    const next = dic.add(query);
    setDic(next);
    setTags([...tags, query]);
    setQuery("");
  }, [query, dic]);
  const suggestHandler = useCallback(
    (key: string) => () => {
      setTags([...tags, key]);
      setQuery("");
    },
    [tags]
  );
  const saveHandler = useCallback(async () => {
    if (data) {
      const res = await fetch("/api/images/tags", {
        method: "PATCH",
        body: JSON.stringify({
          id: data.payload.id,
          tags,
        }),
      });
      const json = await res.json();
      localStorage.setItem("queries", JSON.stringify(Array.from(dic)));
    }
  }, [tags, dic, data]);
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
        src={`${process.env.NEXT_PUBLIC_PICSUR_ENDPOINT}/i/${data.payload.picsurId}.webp`}
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
