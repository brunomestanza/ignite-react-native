import React from "react";
import { AuthProvider } from "./authContext";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};
