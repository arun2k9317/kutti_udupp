"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { kuttiTheme } from "@/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={kuttiTheme} defaultColorScheme="light">
      <Notifications position="top-right" zIndex={1200} />
      {children}
    </MantineProvider>
  );
}
