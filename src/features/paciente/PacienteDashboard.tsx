import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DashboardHomePaciente from "./DashboardHomePaciente";
import ConsultasPaciente from "./ConsultasPaciente";
import ExamesPaciente from "./ExamesPaciente";
import PerfilPaciente from "./PerfilPaciente";
import MedicacoesPaciente from "./MedicacoesPaciente";

const MENU = [
  { key: "dashboard", label: "Dashboard", icon: "fa-home" },
  { key: "consultas", label: "Consultas", icon: "fa-calendar-check" },
  { key: "exames", label: "Exames", icon: "fa-file-medical" },
  { key: "medicacoes", label: "Medicações", icon: "fa-pills" },
  { key: "perfil", label: "Perfil", icon: "fa-user-circle" },
];

export default function PacienteDashboard() {
  const [hora, setHora] = useState("");
  const [menu, setMenu] = useState("dashboard");
  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setHora(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  let Conteudo;
  if (menu === "dashboard") Conteudo = <DashboardHomePaciente />;
  else if (menu === "consultas") Conteudo = <ConsultasPaciente />;
  else if (menu === "exames") Conteudo = <ExamesPaciente />;
  else if (menu === "perfil") Conteudo = <PerfilPaciente />;
  else if (menu === "medicacoes") Conteudo = <MedicacoesPaciente />;

  return (
    <div className="flex min-h-screen bg-[#f0f7ff] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-moyo-primary to-moyo-secondary text-white flex flex-col p-6 shadow-lg z-10">
        <div className="flex items-center mb-8">
          <i className="fas fa-heartbeat text-2xl mr-3"></i>
          <h1 className="text-2xl font-bold">Moyo</h1>
        </div>
        <div className="text-center mb-6 border-b border-white/20 pb-6">
          <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center text-moyo-primary text-4xl mb-3">
            <i className="fas fa-user"></i>
          </div>
          <h2 className="text-lg font-semibold">Herculano António</h2>
          <p className="text-sm opacity-80">Paciente desde 2024</p>
        </div>
        <ul className="flex-1 space-y-2">
          {MENU.map(item => (
            <li key={item.key}>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-lg transition font-semibold ${menu === item.key ? "bg-white/10" : "hover:bg-white/15"}`}
                onClick={() => setMenu(item.key)}
              >
                <i className={`fas ${item.icon} w-6 text-xl mr-3`}></i>{item.label}
              </button>
            </li>
          ))}
          <li>
            <button className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-red-600 bg-red-500 font-semibold transition" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt w-6 text-xl mr-3"></i>Sair
            </button>
          </li>
        </ul>
      </aside>
      {/* Main Content */}
      <main className="flex-1 w-full p-8 overflow-y-auto bg-transparent">
        {/* Welcome Banner */}
        <div className="welcome-banner relative bg-gradient-to-br from-blue-600 to-gray-900 rounded-2xl p-8 text-white mb-8 shadow-lg overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Olá, Hércules! Bem-vindo à sua área do paciente! {hora}</h1>
            <p className="text-base md:text-lg opacity-90 max-w-xl">Aqui você pode gerenciar suas consultas, exames, medicamentos e informações de saúde.</p>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[80px] opacity-10 z-0">
            <i className="fas fa-user-injured"></i>
          </div>
        </div>
        {Conteudo}
      </main>
    </div>
  );
}
