"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TestModeContextValue {
  isTestActive: boolean;
  setTestActive: (val: boolean) => void;
}

const TestModeContext = createContext<TestModeContextValue>({
  isTestActive: false,
  setTestActive: () => {},
});

export function TestModeProvider({ children }: { children: ReactNode }) {
  const [isTestActive, setTestActive] = useState(false);
  return (
    <TestModeContext.Provider value={{ isTestActive, setTestActive }}>
      {children}
    </TestModeContext.Provider>
  );
}

export function useTestMode() {
  return useContext(TestModeContext);
}
