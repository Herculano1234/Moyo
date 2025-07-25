import React from "react";

export default function PerfilPaciente() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-full p-4">
      <h2 className="text-2xl font-bold text-moyo-primary mb-4 flex items-center gap-2">
        <i className="fas fa-user"></i> Perfil
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-white rounded-xl shadow p-6 mb-6 w-full">
          <h3 className="text-lg font-semibold mb-2">Dados Pessoais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Nome</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2"
                value="João da Silva"
                readOnly
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Data de Nascimento</label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                value="1980-01-01"
                readOnly
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">E-mail</label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2"
                value="joao@email.com"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 w-full">
          <h3 className="text-lg font-semibold mb-2">Endereço</h3>
          <div className="text-moyo-gray">
            Rua Exemplo, 123 - Centro
          </div>
        </div>
        {/* Card extra para ocupar o grid */}
        <div className="bg-transparent shadow-none p-6 w-full"></div>
      </div>
    </div>
  );
}
