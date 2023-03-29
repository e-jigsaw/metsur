"use client";
import useSwr from "swr";
import { useState } from "react";
import { fetcher } from "lib/fetcher";

export const Uploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const { data } = useSwr("/api/keys/me", fetcher);
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          if (event.currentTarget.files) {
            if (event.currentTarget.files[0]) {
              setFile(event.currentTarget.files[0]);
            }
          }
        }}
        accept="image/*"
      ></input>
      <button
        onClick={async () => {
          if (file) {
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
              console.log(json.data.id);
            }
          }
        }}
      >
        create
      </button>
    </div>
  );
};
