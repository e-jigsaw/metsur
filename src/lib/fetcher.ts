export type Envelope<T> = {
  ok: boolean;
  payload: T;
};

export const fetcher = async (key: string) => {
  const res = await fetch(key);
  const json = await res.json();
  return json;
};
