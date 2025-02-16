
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SettingsContextType {
  showBpmKey: boolean;
  setShowBpmKey: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [showBpmKey, setShowBpmKey] = useState(false);

  return (
    <SettingsContext.Provider value={{ showBpmKey, setShowBpmKey }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
