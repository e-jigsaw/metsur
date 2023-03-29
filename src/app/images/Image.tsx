import { Image as ImageType } from "@prisma/client";
import format from "date-fns/format";
import { useState, useCallback } from "react";
import clsx from "clsx";
import { KeyedMutator } from "swr";
import { Envelope } from "lib/fetcher";

export const Image: React.FC<{
  image: ImageType;
  mutate: KeyedMutator<Envelope<ImageType[]>>;
}> = ({ image, mutate }) => {
  const [tags, setTags] = useState(image.tags.join(","));
  const rateHandler = useCallback(
    (index: number) => async () => {
      const res = await fetch("/api/images/rate", {
        method: "PATCH",
        body: JSON.stringify({
          id: image.id,
          rate: index,
        }),
      });
      const json = await res.json();
      mutate();
    },
    [image]
  );
  return (
    <div>
      <img
        src={`${process.env.NEXT_PUBLIC_PICSUR_ENDPOINT}/i/${image.picsurId}.webp`}
      ></img>
      <div>{format(new Date(image.created ?? 0), "yyyy/MM/dd")}</div>
      <div>
        <input
          value={tags}
          onChange={(event) => setTags(event.currentTarget.value)}
          className="border"
        ></input>
        <button className="border">save</button>
      </div>
      <div className="grid grid-cols-5">
        {[...new Array(10)].map((_, i) => (
          <button
            key={i}
            className={clsx("border", image.rate === i + 1 && "bg-orange-300")}
            onClick={rateHandler(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
