import React, { useState, useEffect } from "react";

interface Exame {
  id: string;
  tipo: string;
  data: string;
  unidade: string;
  status: "pendente" | "concluido" | "cancelado" | "remarcado";
  dataAnterior?: string;
}

function getExames(): Exame[] {
  try {
    return JSON.parse(localStorage.getItem("moyo-exames") || "[]");
  } catch {
    return [];
  }
}

function saveExames(exames: Exame[]) {
  localStorage.setItem("moyo-exames", JSON.stringify(exames));
}

export default function ExamesPaciente() {
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [unidade, setUnidade] = useState("");
  const [exames, setExames] = useState<Exame[]>([]);
  const [agendado, setAgendado] = useState(false);
  const [remarcarId, setRemarcarId] = useState<string | null>(null);
  const [novaData, setNovaData] = useState("");

  const unidadesDisponiveis = [
    "Hospital Geral de Luanda",
    "Clínica Sagrada Esperança",
    "Hospital Josina Machel",
    "Hospital Militar",
    "Clínica Multiperfil",
    "Hospital Americo Boavida",
    "Hospital Maria Pia",
  ];

  useEffect(() => {
    setExames(getExames());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoExame: Exame = {
      id: Date.now().toString(),
      tipo,
      data,
      unidade,
      status: "pendente",
    };
    const novos = [novoExame, ...exames];
    setExames(novos);
    saveExames(novos);
    setAgendado(true);
    setTipo("");
    setData("");
    setUnidade("");
    setTimeout(() => setAgendado(false), 2000);
  };

  const handleCancelar = (id: string) => {
    const novos = exames.map((e) =>
      e.id === id ? { ...e, status: "cancelado" as const } : e
    );
    setExames(novos);
    saveExames(novos);
  };

  const handleRemarcar = (id: string) => {
    setRemarcarId(id);
    setNovaData("");
  };

  const handleConfirmarRemarcacao = () => {
    if (!remarcarId || !novaData) return;
    const novos = exames.map((e) =>
      e.id === remarcarId
        ? {
            ...e,
            status: "remarcado" as Exame["status"],
            dataAnterior: e.data,
            data: novaData,
          }
        : e
    ) as Exame[];
    setExames(novos);
    saveExames(novos);
    setRemarcarId(null);
    setNovaData("");
  };

  const handleCancelarRemarcacao = () => {
    setRemarcarId(null);
    setNovaData("");
  };

  const pendentes = exames.filter((e) => e.status === "pendente");
  const historico = exames.filter((e) => e.status !== "pendente");

  return (
    <div className="flex-1 w-full flex flex-col min-h-full p-4 ">
      <h2 className="text-2xl font-bold text-moyo-primary mb-4 flex items-center gap-2">
        <i className="fas fa-vials"></i> Exames
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Solicitar Exame */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 w-full">
          <h3 className="text-lg font-semibold mb-2">Solicitar Novo Exame</h3>
          {agendado ? (
            <div className="text-green-600 font-bold">
              Exame solicitado com sucesso!
            </div>
          ) : (
            <form
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block font-medium mb-1">Tipo de Exame</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option>Hemograma</option>
                  <option>Raio-X</option>
                  <option>Ultrassom</option>
                  <option>ECG</option>
                  <option>Outro</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Data</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Unidade</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={unidade}
                  onChange={(e) => setUnidade(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  {unidadesDisponiveis.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="bg-moyo-primary text-white px-6 py-2 rounded-lg font-bold mt-2 hover:bg-moyo-secondary transition"
                >
                  Solicitar
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Exames Pendentes */}
        <div className="bg-white rounded-xl shadow p-6 w-full">
          <h3 className="text-lg font-semibold mb-2">Exames Pendentes</h3>
          {pendentes.length === 0 ? (
            <div className="text-moyo-gray">Nenhum exame pendente.</div>
          ) : (
            <ul className="space-y-3">
              {pendentes.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between bg-moyo-primary/5 rounded-lg px-3 py-2 gap-2"
                >
                  <div>
                    <span className="font-semibold">{e.tipo}</span>{" "}
                    <span className="text-sm text-moyo-gray">({e.data})</span>
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {e.unidade}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleRemarcar(e.id)}
                      className="text-moyo-primary hover:underline text-sm"
                    >
                      Remarcar
                    </button>
                    <button
                      onClick={() => handleCancelar(e.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Card extra para ocupar o grid */}
        <div className="bg-transparent shadow-none p-6 w-full"></div>
      </div>

      {/* Modal de Remarcação */}
      {remarcarId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl w-full max-w-md animate-popin">
            <h3 className="text-lg font-bold mb-4">Remarcar Exame</h3>
            <label className="block font-medium mb-1">Nova Data</label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 mb-4"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
              required
            />
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleCancelarRemarcacao}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarRemarcacao}
                className="bg-moyo-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-moyo-secondary transition"
                disabled={!novaData}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Histórico de Exames */}
      <div className="bg-white rounded-xl shadow p-6 w-full mt-6">
        <h3 className="text-lg font-semibold mb-2">Histórico de Exames</h3>
        {historico.length === 0 ? (
          <div className="text-moyo-gray">Nenhum histórico disponível.</div>
        ) : (
          <ul className="space-y-3">
            {historico.map((e) => (
              <li
                key={e.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-100 rounded-lg px-3 py-2 gap-2"
              >
                <div>
                  <span className="font-semibold">{e.tipo}</span>{" "}
                  <span className="text-sm text-moyo-gray">({e.data})</span>
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {e.unidade}
                  </span>
                  {e.status === "remarcado" && e.dataAnterior && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Remarcado de {e.dataAnterior}
                    </span>
                  )}
                  <span
                    className={`ml-2 text-xs px-2 py-1 rounded ${
                      e.status === "cancelado"
                        ? "bg-red-100 text-red-600"
                        : e.status === "remarcado"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {e.status === "cancelado"
                      ? "Cancelado"
                      : e.status === "remarcado"
                      ? "Remarcado"
                      : "Concluído"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
