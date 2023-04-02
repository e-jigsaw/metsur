import { Tags } from "./Tags";

export default async function ({ params }) {
  return <Tags name={params.name}></Tags>;
}
