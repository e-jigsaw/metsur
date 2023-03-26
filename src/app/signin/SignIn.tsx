"use client";
import { signIn, useSession } from "next-auth/react";

export const SignIn = () => {
  const { data, status } = useSession();
  console.log(data, status);
  return (
    <div>
      <button onClick={() => signIn("github")}>sign in</button>
    </div>
  );
};
