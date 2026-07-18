"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider>
      <Provider store={store}>
        {mounted ? (
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        ) : (
          children
        )}
      </Provider>
    </SessionProvider>
  );
}
