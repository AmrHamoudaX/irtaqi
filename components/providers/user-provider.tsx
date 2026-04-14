"use client";

import { createContext, use } from "react";
import { User } from "@/lib/generated/prisma/client";

export const UserContext = createContext<Promise<User | null> | null>(null);

export default function UserProvider({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise: Promise<User | null>;
}) {
  return <UserContext value={userPromise}>{children}</UserContext>;
}

export function useUser() {
  const promise = use(UserContext);
  if (!promise) return null;
  return use(promise);
}
