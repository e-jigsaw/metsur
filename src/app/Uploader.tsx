"use client";
import useSwr from "swr";
import { useState } from "react";
import { fetcher } from "lib/fetcher";
import { useRouter } from "next/navigation";

export const Uploader = () => {
  const router = useRouter();
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
              const res1 = await fetch(`/api/images/create`, {
                method: "POST",
                body: JSON.stringify({
                  id: json.data.id,
                }),
              });
              const json1 = await res1.json();
              router.push(`/image/${json1.payload.id}`);
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
