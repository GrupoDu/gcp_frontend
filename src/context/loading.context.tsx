"use client";

import { createContext } from "react";

type Loading = {
  setIsLoading: (bool: boolean) => void;
  isLoading: boolean;
};

export const LoadingContext = createContext<Loading | undefined>(undefined);
