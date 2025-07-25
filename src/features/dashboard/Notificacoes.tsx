import React from "react";

export default function Notificacoes() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-moyo-primary mb-4">Notificações</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <p className="text-gray-700 dark:text-gray-200">Nenhuma notificação no momento.</p>
      </div>
    </div>
  );
}
