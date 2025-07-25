import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/pacientes", label: "Pacientes" },
  { path: "/exames", label: "Exames" },
  { path: "/relatorios", label: "Relatórios" },
  { path: "/dashboard/perfil", label: "Editar Perfil" },
  // Futuras rotas: { path: "/triagem", label: "Triagem" }
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold text-moyo-primary p-6">Moyo</div>
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                "py-2 px-4 rounded hover:bg-moyo-primary/10 " +
                (location.pathname === item.path ? "bg-moyo-primary/10 font-bold text-moyo-primary" : "")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <ThemeToggle />
      </div>
    </aside>
  );
}
