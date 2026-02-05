"use client";

import { User } from "@/types/user.type";
import { createContext } from "react";

type UserContextValues = {
  usersData: User[] | undefined;
  err: string | undefined;
  status: string | undefined;
  refetch: () => void;
};

export const UserContext = createContext<UserContextValues | undefined>(
  undefined,
);
