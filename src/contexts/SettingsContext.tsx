
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SettingsContextType {
  showBpmKey: boolean;
  setShowBpmKey: (value: boolean) => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [showBpmKey, setShowBpmKey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('show_bpm_key')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading settings:', error);
        return;
      }

      if (data) {
        setShowBpmKey(data.show_bpm_key);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateShowBpmKey = async (value: boolean) => {
    setShowBpmKey(value);
    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({ id: 1, show_bpm_key: value }, { onConflict: 'id' });

      if (error) {
        console.error('Error saving setting:', error);
      }
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ 
      showBpmKey, 
      setShowBpmKey: updateShowBpmKey,
      isLoading 
    }}>
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
