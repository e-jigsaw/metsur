import { Image as ImageType } from "@prisma/client";
import format from "date-fns/format";
import { useState } from "react";

export const Image: React.FC<{ image: ImageType }> = ({ image }) => {
  const [tags, setTags] = useState(image.tags.join(","));
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
    </div>
  );
};
