"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Produtos", path: "/products" },
    { name: "Matérias-Primas", path: "/raw-materials" },
    { name: "Associações", path: "/associations" },
    { name: "Manufacturing Plan", path: "/manufacturing-plan" },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={{ marginBottom: "20px" }}>AutoFlex</h2>

      {menu.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          style={{
            ...styles.menuItem,
            backgroundColor: pathname === item.path ? "#333" : "transparent",
            display: "block",
          }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    background: "#1e1e1e",
    color: "white",
    padding: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
  },
  menuItem: {
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "8px",
    cursor: "pointer",
  },
};
