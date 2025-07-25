import React from "react";

import { useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className="h-16 flex items-center px-6 bg-gray-100 dark:bg-gray-900 border-b dark:border-gray-700 justify-between">
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Painel de Gestão Hospitalar
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Bom dia, Dr Herculano !
        </span>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-moyo-primary"
        />
        <button
          onClick={() => navigate("/notificacoes")}
          className="ml-2 relative group"
          title="Notificações"
        >
          <BellIcon className="w-7 h-7 text-moyo-primary group-hover:text-moyo-accent transition" />
          {/* Badge de notificação (exemplo) */}
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span> */}
        </button>
        <button
          onClick={handleLogout}
          className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
