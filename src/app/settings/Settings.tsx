"use client";

import { useState } from "react";

export const Settings = () => {
  const [key, setKey] = useState("");
  return (
    <div>
      <input
        type="password"
        value={key}
        onChange={(event) => setKey(event.currentTarget.value)}
      ></input>
      <button
        onClick={async () => {
          const res = await fetch("/api/keys/new", {
            method: "POST",
            body: JSON.stringify({
              key,
            }),
          });
          const json = await res.json();
          console.log(json);
        }}
      >
        save
      </button>
    </div>
  );
};
