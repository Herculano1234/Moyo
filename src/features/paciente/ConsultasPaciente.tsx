import React, { useState, useEffect } from "react";

const perguntasTriagem = [
  { id: 1, texto: "Está sentindo febre?", tipo: "select", opcoes: ["Leve", "Moderado", "Alto"] },
  { id: 2, texto: "Está com dor?", tipo: "select", opcoes: ["Leve", "Moderado", "Alto"] },
  { id: 3, texto: "Sintomas respiratórios?", tipo: "select", opcoes: ["Leve", "Moderado", "Alto"] },
  { id: 4, texto: "Qual a urgência do seu caso?", tipo: "select", opcoes: ["Baixa", "Média", "Alta"] },
  { id: 5, texto: "Descreva seus sintomas", tipo: "textarea" },
];

interface Consulta {
  id: string;
  especialidade: string;
  data: string;
  status: "pendente" | "concluida" | "cancelada";
  triagem?: {
    [key: number]: string;
  };
}

function getConsultas(): Consulta[] {
  try {
    return JSON.parse(localStorage.getItem("moyo-consultas") || "[]");
  } catch {
    return [];
  }
}

function saveConsultas(consultas: Consulta[]) {
  localStorage.setItem("moyo-consultas", JSON.stringify(consultas));
}

export default function ConsultasPaciente() {
  const [especialidade, setEspecialidade] = useState("");
  const [data, setData] = useState("");
  const [showTriagem, setShowTriagem] = useState(false);
  const [respostas, setRespostas] = useState<{ [key: number]: string }>({});
  const [agendado, setAgendado] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filtroEsp, setFiltroEsp] = useState("");
  const [filtroData, setFiltroData] = useState("");

  useEffect(() => {
    setConsultas(getConsultas());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!especialidade || !data) {
      setErro("Preencha todos os campos.");
      return;
    }
    setShowTriagem(true);
  };

  const handleTriagemChange = (id: number, valor: string) => {
    setRespostas((prev) => ({ ...prev, [id]: valor }));
  };

  const handleTriagemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setShowTriagem(false);
      const novaConsulta: Consulta = {
        id: Date.now().toString(),
        especialidade,
        data,
        status: "pendente",
        triagem: respostas,
      };
      const novasConsultas = [novaConsulta, ...consultas];
      setConsultas(novasConsultas);
      saveConsultas(novasConsultas);
      setAgendado(true);
      setEspecialidade("");
      setData("");
      setRespostas({});
      setLoading(false);
      setTimeout(() => setAgendado(false), 2000);
    }, 1200);
  };

  const handleCancelar = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      const novas = consultas.map(c =>
        c.id === id ? { ...c, status: "cancelada" as const } : c
      );
      setConsultas(novas);
      saveConsultas(novas);
      setLoading(false);
    }, 1000);
  };

  // Filtros
  const pendentes = consultas.filter(c => c.status === "pendente").filter(c =>
    (!filtroEsp || c.especialidade === filtroEsp) && (!filtroData || c.data === filtroData)
  );
  const historico = consultas.filter(c => c.status !== "pendente").filter(c =>
    (!filtroEsp || c.especialidade === filtroEsp) && (!filtroData || c.data === filtroData)
  );
  const especialidades = Array.from(new Set(consultas.map(c => c.especialidade)));

  return (
    <div className="flex-1 w-full flex flex-col min-h-full p-4">
      <h2 className="text-2xl font-bold text-moyo-primary mb-4 flex items-center gap-2">
        <i className="fas fa-calendar-check"></i> Consultas
      </h2>
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select className="border rounded-lg px-3 py-2" value={filtroEsp} onChange={e => setFiltroEsp(e.target.value)}>
          <option value="">Todas Especialidades</option>
          {especialidades.map(esp => <option key={esp}>{esp}</option>)}
        </select>
        <input type="date" className="border rounded-lg px-3 py-2" value={filtroData} onChange={e => setFiltroData(e.target.value)} />
        <button className="px-4 py-2 rounded bg-gray-200" onClick={() => { setFiltroEsp(""); setFiltroData(""); }}>Limpar Filtros</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-white rounded-xl shadow p-6 mb-6 w-full">
          <h3 className="text-lg font-semibold mb-2">Agendar Nova Consulta</h3>
          {erro && <div className="text-red-500 text-sm mb-2">{erro}</div>}
          {agendado && <div className="text-green-600 font-bold mb-2">Consulta agendada com sucesso!</div>}
          {loading && <div className="text-moyo-primary font-semibold mb-2 animate-pulse">Processando...</div>}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium mb-1">Especialidade</label>
              <select className="w-full border rounded-lg px-3 py-2" value={especialidade} onChange={e => setEspecialidade(e.target.value)} required>
                <option value="">Selecione</option>
                <option>Cardiologia</option>
                <option>Pediatria</option>
                <option>Clínica Geral</option>
                <option>Ortopedia</option>
                <option>Outra</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Data</label>
              <input type="date" className="w-full border rounded-lg px-3 py-2" value={data} onChange={e => setData(e.target.value)} required />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="bg-moyo-primary text-white px-6 py-2 rounded-lg font-bold mt-2 hover:bg-moyo-secondary transition" disabled={loading}>Agendar</button>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-xl shadow p-6 w-full">
          <h3 className="text-lg font-semibold mb-2">Consultas Pendentes</h3>
          {pendentes.length === 0 ? (
            <div className="text-moyo-gray">Nenhuma consulta pendente.</div>
          ) : (
            <ul className="space-y-3">
              {pendentes.map(c => (
                <li key={c.id} className="flex items-center justify-between bg-moyo-primary/5 rounded-lg px-3 py-2">
                  <div>
                    <span className="font-semibold">{c.especialidade}</span> <span className="text-sm text-moyo-gray">({c.data})</span>
                  </div>
                  <button onClick={() => handleCancelar(c.id)} className="text-red-500 hover:underline text-sm" disabled={loading}>Cancelar</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Card extra para ocupar o grid */}
        <div className="bg-transparent shadow-none p-6 w-full"></div>
      </div>
      {/* Histórico de Consultas */}
      <div className="bg-white rounded-xl shadow p-6 w-full mt-6">
        <h3 className="text-lg font-semibold mb-2">Histórico de Consultas</h3>
        {historico.length === 0 ? (
          <div className="text-moyo-gray">Nenhum histórico disponível.</div>
        ) : (
          <ul className="space-y-3">
            {historico.map(c => (
              <li key={c.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                <div>
                  <span className="font-semibold">{c.especialidade}</span> <span className="text-sm text-moyo-gray">({c.data})</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded ${c.status === "cancelada" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {c.status === "cancelada" ? "Cancelada" : "Concluída"}
                  </span>
                  {c.triagem && (
                    <div className="mt-1 text-xs text-moyo-gray">
                      <div><b>Urgência:</b> {c.triagem[4]}</div>
                      <div><b>Sintomas:</b> {c.triagem[5]}</div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Modal de Triagem Digital */}
      {showTriagem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-moyo-primary">Triagem Digital</h3>
            {loading && <div className="text-moyo-primary font-semibold mb-2 animate-pulse">Processando...</div>}
            <form onSubmit={handleTriagemSubmit} className="space-y-4">
              {perguntasTriagem.map((p) => (
                <div key={p.id}>
                  <label className="block font-medium mb-2">{p.texto}</label>
                  {p.tipo === "select" && (
                    <select
                      className="w-full border rounded-lg px-3 py-2"
                      name={`pergunta-${p.id}`}
                      value={respostas[p.id] || ""}
                      onChange={e => handleTriagemChange(p.id, e.target.value)}
                      required
                    >
                      <option value="">Selecione</option>
                      {p.opcoes!.map(op => <option key={op}>{op}</option>)}
                    </select>
                  )}
                  {p.tipo === "textarea" && (
                    <textarea
                      className="w-full border rounded-lg px-3 py-2"
                      name={`pergunta-${p.id}`}
                      value={respostas[p.id] || ""}
                      onChange={e => handleTriagemChange(p.id, e.target.value)}
                      rows={3}
                      placeholder="Descreva seus sintomas aqui..."
                      required
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowTriagem(false)} className="px-4 py-2 rounded bg-gray-200" disabled={loading}>Cancelar</button>
                <button type="submit" className="bg-moyo-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-moyo-secondary transition" disabled={loading}>Finalizar Triagem</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
