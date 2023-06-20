import { useSession } from "next-auth/react";

export const useAuthUser = () => {
  const { data: session, status } = useSession();

  const user = status === "authenticated" && session ? session.user : null;

  return user;
};
