import { Image } from "./Image";

export default async function ({ params }) {
  return <Image id={params.id}></Image>;
}
