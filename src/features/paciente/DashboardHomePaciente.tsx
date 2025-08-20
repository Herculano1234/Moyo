import React, { useEffect, useState } from "react";

export default function DashboardHomePaciente() {
  const [paciente, setPaciente] = useState<any>(null);
  const [consultas, setConsultas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("moyo-user");
    if (!user) {
      setError("Usuário não encontrado. Faça login novamente.");
      setLoading(false);
      return;
    }
    const pacienteData = JSON.parse(user);
    setPaciente(pacienteData);
    // Buscar consultas do paciente
    fetch(`http://localhost:4000/pacientes/${pacienteData.id}/consultas`)
      .then(async (res) => {
        if (!res.ok) return setConsultas([]);
        const data = await res.json();
        setConsultas(data);
      })
      .catch(() => setConsultas([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Carregando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="flex-1 w-full flex flex-col min-h-full p-4">
      <div className="mb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Próxima Consulta */}
          <div className="card bg-white rounded-2xl shadow p-6 border-l-4 border-moyo-primary flex flex-col">
            <div className="flex items-center mb-4"><i className="fas fa-calendar-alt text-moyo-primary text-2xl mr-3"></i><h2 className="text-lg font-bold text-moyo-dark">Próxima Consulta</h2></div>
            <div className="flex-1 flex flex-col justify-center items-center">
              {consultas.length > 0 ? (
                <>
                  <i className="fas fa-calendar-check text-4xl text-moyo-primary mb-2"></i>
                  <p className="text-moyo-dark mb-1">{consultas[0].data}</p>
                  <p className="text-moyo-gray text-sm">{consultas[0].descricao}</p>
                </>
              ) : (
                <>
                  <i className="fas fa-calendar-times text-4xl text-moyo-gray mb-2 opacity-30"></i>
                  <p className="text-moyo-gray mb-1">Nenhuma consulta agendada</p>
                  <p className="text-moyo-gray text-sm">Agende uma nova consulta para começar</p>
                </>
              )}
            </div>
          </div>
          {/* Histórico de Consultas */}
          <div className="card bg-white rounded-2xl shadow p-6 border-l-4 border-moyo-accent flex flex-col">
            <div className="flex items-center mb-4"><i className="fas fa-history text-moyo-accent text-2xl mr-3"></i><h2 className="text-lg font-bold text-moyo-dark">Histórico de Consultas</h2></div>
            <div className="flex-1 flex flex-col justify-center items-center">
              {consultas.length > 0 ? (
                <ul className="w-full">
                  {consultas.map((c, idx) => (
                    <li key={idx} className="mb-2 text-moyo-gray text-sm">{c.data} - {c.descricao}</li>
                  ))}
                </ul>
              ) : (
                <>
                  <i className="fas fa-clock text-4xl text-moyo-gray mb-2 opacity-30"></i>
                  <p className="text-moyo-gray mb-1">Nenhum histórico disponível</p>
                  <p className="text-moyo-gray text-sm">Seu histórico de consultas estará disponível aqui</p>
                </>
              )}
            </div>
          </div>
          {/* Lembretes e Alertas */}
          <div className="card bg-white rounded-2xl shadow p-6 border-l-4 border-yellow-400 flex flex-col">
            <div className="flex items-center mb-4"><i className="fas fa-bell text-yellow-400 text-2xl mr-3"></i><h2 className="text-lg font-bold text-moyo-dark">Lembretes e Alertas</h2></div>
            <ul className="space-y-4">
              <li className="flex items-start"><i className="fas fa-info-circle text-yellow-400 mt-1 mr-3"></i><div><h4 className="font-semibold mb-1">Você receberá lembretes de consultas e exames aqui</h4><p className="text-moyo-gray text-sm">Configure suas preferências de notificação</p></div></li>
              <li className="flex items-start"><i className="fas fa-exclamation-triangle text-yellow-400 mt-1 mr-3"></i><div><h4 className="font-semibold mb-1">Fique atento às notificações importantes do hospital</h4><p className="text-moyo-gray text-sm">Verifique regularmente esta seção</p></div></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Recomendações Médicas */}
      <div className="recommendations bg-white rounded-2xl shadow ">
        <div className="flex items-center mb-4"><i className="fas fa-stethoscope text-moyo-accent text-2xl mr-3"></i><h2 className="text-lg font-bold text-moyo-dark">Recomendações Médicas</h2></div>
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center py-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-moyo-accent text-xl mr-4"><i className="fas fa-pills"></i></div>
            <div><h4 className="font-semibold mb-1">Losartana 50mg</h4><p className="text-moyo-gray text-sm">Tomar 1 comprimido pela manhã, todos os dias</p></div>
          </li>
          <li className="flex items-center py-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-moyo-accent text-xl mr-4"><i className="fas fa-pills"></i></div>
            <div><h4 className="font-semibold mb-1">Atorvastatina 20mg</h4><p className="text-moyo-gray text-sm">Tomar 1 comprimido à noite, após o jantar</p></div>
          </li>
          <li className="flex items-center py-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-moyo-accent text-xl mr-4"><i className="fas fa-heartbeat"></i></div>
            <div><h4 className="font-semibold mb-1">Controle de Pressão</h4><p className="text-moyo-gray text-sm">Medir a pressão arterial 2 vezes por semana</p></div>
          </li>
          <li className="flex items-center py-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-moyo-accent text-xl mr-4"><i className="fas fa-walking"></i></div>
            <div><h4 className="font-semibold mb-1">Atividade Física</h4><p className="text-moyo-gray text-sm">Caminhada de 30 minutos, 5 dias por semana</p></div>
          </li>
        </ul>
      </div>
    </div>
  );
}
