import type { ReactNode } from "react";
import type { MenuTree } from "@synerqo/core";

import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  menus: readonly MenuTree[];
  children: ReactNode;
}

export default function MainLayout({
  menus,
  children,
}: MainLayoutProps) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f3f4f6",
      }}
    >
      <Header />

      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Sidebar menus={menus} />

        <main
          style={{
            flex: 1,
            padding: 24,
            overflow: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}