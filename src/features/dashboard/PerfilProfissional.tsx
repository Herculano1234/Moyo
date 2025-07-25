import React, { useState, useRef } from "react";

export default function PerfilProfissional() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [hospital, setHospital] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFoto(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode integrar com a API para atualizar o perfil
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row gap-10 items-stretch justify-center">
      {/* Card de Foto e Dados Básicos */}
      <div className="flex-1 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl flex flex-col items-center min-w-[320px] max-w-[400px]">
        <div className="relative mb-6">
          <img
            src={foto || "https://randomuser.me/api/portraits/men/32.jpg"}
            alt="avatar"
            className="w-40 h-40 rounded-full border-4 border-moyo-primary object-cover shadow-lg"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-3 right-3 bg-moyo-primary text-white px-3 py-1 rounded text-xs hover:bg-moyo-primary-dark shadow"
          >
            Alterar Foto
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFotoChange}
            className="hidden"
          />
        </div>
        <div className="text-center w-full">
          <h3 className="text-2xl font-bold text-moyo-primary mb-2">{nome || "Nome do Profissional"}</h3>
          <p className="text-gray-500 dark:text-gray-300 text-base mb-1">{especialidade || "Especialidade"}</p>
          <p className="text-gray-500 dark:text-gray-300 text-base">{hospital || "Hospital"}</p>
        </div>
      </div>

      {/* Card de Edição */}
      <form onSubmit={handleSubmit} className="flex-1 bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl flex flex-col gap-6 min-w-[320px] max-w-[500px] justify-center">
        <h2 className="text-3xl font-bold mb-2 text-moyo-primary text-center">Editar Perfil</h2>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Nome</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg text-lg"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border rounded-lg text-lg"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Senha</label>
          <input
            type="password"
            className="w-full px-4 py-3 border rounded-lg text-lg"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Hospital</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg text-lg"
            value={hospital}
            onChange={e => setHospital(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Especialidade</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg text-lg"
            value={especialidade}
            onChange={e => setEspecialidade(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-moyo-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-moyo-primary-dark mt-2"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
