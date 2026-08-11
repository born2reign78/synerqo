"use client";

import { useState } from "react";
import type { MenuTree } from "@synerqo/core";

interface SidebarProps {
  menus: readonly MenuTree[];
}

interface MenuNodeProps {
  menu: MenuTree;
  level?: number;
}

function MenuNode({
  menu,
  level = 0,
}: MenuNodeProps) {
  const [open, setOpen] = useState(true);

  const hasChildren = menu.children.length > 0;

  return (
    <>
      <div
        onClick={() => hasChildren && setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          paddingLeft: 12 + level * 20,
          borderRadius: 8,
          cursor: hasChildren ? "pointer" : "default",
          background: "#374151",
          userSelect: "none",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            width: 16,
            textAlign: "center",
          }}
        >
          {hasChildren ? (open ? "▼" : "▶") : ""}
        </span>

        <span>{menu.title}</span>
      </div>

      {open &&
        hasChildren &&
        menu.children.map((child) => (
          <MenuNode
            key={child.id}
            menu={child}
            level={level + 1}
          />
        ))}
    </>
  );
}

export default function Sidebar({
  menus,
}: SidebarProps) {
  return (
    <aside
      style={{
        width: 280,
        background: "#1f2937",
        color: "#fff",
        borderRight: "1px solid #374151",
        padding: 16,
        overflowY: "auto",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        Navigation
      </h3>

      {menus.map((menu) => (
        <MenuNode
          key={menu.id}
          menu={menu}
        />
      ))}
    </aside>
  );
}