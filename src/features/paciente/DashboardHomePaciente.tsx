import React from "react";

export default function DashboardHomePaciente() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Próxima Consulta */}
        <div className="card bg-white rounded-2xl shadow p-6 border-l-4 border-moyo-primary flex flex-col">
          <div className="flex items-center mb-4"><i className="fas fa-calendar-alt text-moyo-primary text-2xl mr-3"></i><h2 className="text-lg font-bold text-moyo-dark">Próxima Consulta</h2></div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <i className="fas fa-calendar-times text-4xl text-moyo-gray mb-2 opacity-30"></i>
            <p className="text-moyo-gray mb-1">Nenhuma consulta agendada</p>
            <p className="text-moyo-gray text-sm">Agende uma nova consulta para começar</p>
          </div>
        </div>
        {/* Histórico de Consultas */}
        <div className="card bg-white rounded-2xl shadow p-6 border-l-4 border-moyo-accent flex flex-col">
          <div className="flex items-center mb-4"><i className="fas fa-history text-moyo-accent text-2xl mr-3"></i><h2 className="text-lg font-bold text-moyo-dark">Histórico de Consultas</h2></div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <i className="fas fa-clock text-4xl text-moyo-gray mb-2 opacity-30"></i>
            <p className="text-moyo-gray mb-1">Em breve disponível</p>
            <p className="text-moyo-gray text-sm">Seu histórico de consultas estará disponível aqui</p>
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
