"use client";
import useSwr from "swr";
import { useState } from "react";
import { fetcher } from "lib/fetcher";
import Link from "next/link";

export const Uploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const { data } = useSwr("/api/keys/me", fetcher);
  return (
    <div>
      <ul>
        {results.map((res) => (
          <li key={res}>
            <Link href={`/images/${res}`}>{res}</Link>
          </li>
        ))}
      </ul>
      <input
        type="file"
        onChange={(event) => {
          if (event.currentTarget.files) {
            if (event.currentTarget.files[0]) {
              const next: File[] = [];
              for (let i = 0; i < event.currentTarget.files.length; i++) {
                const file = event.currentTarget.files.item(i);
                if (file) {
                  next.push(file);
                }
              }
              setFiles(next);
            }
          }
        }}
        accept="image/*"
        multiple
      ></input>
      <button
        onClick={async () => {
          if (files.length > 0) {
            for (const file of files) {
              const body = new FormData();
              body.append("image", file);
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_PICSUR_ENDPOINT}/api/image/upload`,
                {
                  method: "POST",
                  body,
                  headers: {
                    authorization: `Api-Key ${data?.payload}`,
                  },
                }
              );
              const json = await res.json();
              if (json.data.id) {
                const res1 = await fetch(`/api/images/create`, {
                  method: "POST",
                  body: JSON.stringify({
                    id: json.data.id,
                  }),
                });
                const json1 = await res1.json();
                setResults((prev) => [...prev, json1.payload.id]);
              }
            }
          }
        }}
        className="border p-1 px-2"
      >
        create
      </button>
    </div>
  );
};
