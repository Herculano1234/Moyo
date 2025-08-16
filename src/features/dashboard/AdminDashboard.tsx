import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeHospitalTab, setActiveHospitalTab] = useState("list");
  const [activeUserTab, setActiveUserTab] = useState("patients");
  const [searchTerm, setSearchTerm] = useState("");
  

  // Dados do backend
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/hospitais")
      .then(res => res.json())
      .then(data => setHospitals(data))
      .catch(() => setHospitals([]))
      .finally(() => setLoadingHospitals(false));
    fetch("http://localhost:4000/profissionais-com-hospital")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]))
      .finally(() => setLoadingUsers(false));
  }, []);
  
  const stats = [
    { title: "Total de Hospitais", value: "142", trend: "up", trendValue: "8% desde o último mês", pulse: true },
    { title: "Leitos Disponíveis", value: "3,842", trend: "down", trendValue: "2% desde a última semana" },
    { title: "Hospitais em Manutenção", value: "9", trend: "down", trendValue: "3 desde o último mês" },
    { title: "Novos Hospitais (30d)", value: "6", trend: "up", trendValue: "50% crescimento" }
  ];
  
  // Filtrar hospitais baseado no termo de busca
  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filtrar usuários baseado no tipo selecionado
  const filteredUsers = users.filter(user => 
    activeUserTab === "patients" ? user.type === "Paciente" :
    activeUserTab === "professionals" ? ["Médico", "Enfermeiro"].includes(user.type) :
    activeUserTab === "admins" ? user.type === "Administrador" : true
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Menu Toggle Mobile */}
      <button 
        className="fixed top-4 left-4 z-50 bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-400 to-blue-700 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-20 border-b border-blue-300 px-4">
          <div className="flex items-center space-x-2">
            <i className="fas fa-heartbeat text-2xl text-red-500"></i>
            <span className="text-xl font-bold">Moyo Admin</span>
          </div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-sm ml-4"
            onClick={() => {
              // Simples redirect para a tela principal (ajuste conforme seu router)
              window.location.href = "/";
            }}
            title="Sair da Conta"
          >
            Sair
          </button>
        </div>
        
        <div className="p-4 flex flex-col h-full justify-between min-h-[70vh]">
          <div>
            {[
              { id: "dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
              { id: "hospitals", icon: "fas fa-hospital", label: "Hospitais" },
              { id: "users", icon: "fas fa-users", label: "Usuários" },
              { id: "statistics", icon: "fas fa-chart-line", label: "Estatísticas" },
              { id: "financial", icon: "fas fa-money-bill-wave", label: "Financeiro" },
              { id: "settings", icon: "fas fa-cog", label: "Configurações" }
            ].map((item) => (
              <button
                key={item.id}
                className={`flex items-center w-full px-4 py-3 my-1 rounded-lg transition-all duration-200 ${
                  activeTab === item.id ? "bg-blue-600 bg-opacity-30" : "hover:bg-blue-600 hover:bg-opacity-20"
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
              >
                <i className={`${item.icon} text-lg w-8`}></i>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          <button
            className="flex items-center w-full px-4 py-3 my-1 rounded-lg transition-all duration-200 bg-red-500 hover:bg-red-600 text-white font-bold mt-8"
            onClick={() => {
              localStorage.removeItem("moyo-auth");
              localStorage.removeItem("moyo-perfil");
              window.location.href = "/login";
            }}
            title="Sair da Conta"
          >
            <i className="fas fa-sign-out-alt text-lg w-8"></i>
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <main className="flex-1 p-4 md:p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <i className="fas fa-sync-alt mr-2"></i> Atualizar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow ${
                      stat.pulse ? 'animate-pulse' : ''
                    }`}
                  >
                    <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                    <div className={`flex items-center mt-3 ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      <i className={`fas ${stat.trend === 'up' ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
                      <span className="text-sm font-medium">{stat.trendValue}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Atividade Recente</h2>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex flex-col items-center justify-center text-blue-800">
                    <i className="fas fa-chart-bar text-5xl mb-4"></i>
                    <p className="text-xl font-bold">Visitas por Dia da Semana</p>
                    <div className="w-full max-w-xs mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Segunda</span>
                        <div className="w-3/4 h-4 bg-blue-200 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm font-bold">75%</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Terça</span>
                        <div className="w-3/4 h-4 bg-blue-200 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm font-bold">85%</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Quarta</span>
                        <div className="w-3/4 h-4 bg-blue-200 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-bold">60%</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Quinta</span>
                        <div className="w-3/4 h-4 bg-blue-200 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                        <span className="text-sm font-bold">90%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sexta</span>
                        <div className="w-3/4 h-4 bg-blue-200 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="text-sm font-bold">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Distribuição de Pacientes</h2>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center text-green-800">
                    <div className="text-center">
                      <i className="fas fa-pie-chart text-5xl mb-4"></i>
                      <p className="text-xl font-bold">Distribuição por Especialidade</p>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                          <span>Cardiologia (25%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                          <span>Pediatria (20%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                          <span>Ortopedia (18%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                          <span>Oncologia (15%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                          <span>Neurologia (12%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
                          <span>Outros (10%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                  <button className="px-6 py-4 font-medium text-blue-600 border-b-2 border-blue-600">
                    Alertas Recentes
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagem</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">15/08/2025</td>
                        <td className="px-6 py-4">Atualização do sistema agendada para amanhã</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Média
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-500 hover:text-blue-700 mr-3">
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">14/08/2025</td>
                        <td className="px-6 py-4">Novo hospital cadastrado: Hospital Santa Luzia</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Baixa
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-500 hover:text-blue-700 mr-3">
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">13/08/2025</td>
                        <td className="px-6 py-4">Servidor de banco de dados apresentando alta carga</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Alta
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-500 hover:text-blue-700 mr-3">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-cog"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Hospitals Tab */}
          {activeTab === "hospitals" && (
            <div className="animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Gestão de Hospitais</h1>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <i className="fas fa-plus mr-2"></i> Adicionar Hospital
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <i className="fas fa-print mr-2"></i> Imprimir
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <i className="fas fa-download mr-2"></i> Exportar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow animate-pulse">
                  <h3 className="text-gray-500 text-sm font-medium">Total de Hospitais</h3>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">142</p>
                  <div className="flex items-center mt-3 text-green-500">
                    <i className="fas fa-arrow-up mr-1"></i>
                    <span className="text-sm font-medium">8% desde o último mês</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-gray-500 text-sm font-medium">Leitos Disponíveis</h3>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">3,842</p>
                  <div className="flex items-center mt-3 text-red-500">
                    <i className="fas fa-arrow-down mr-1"></i>
                    <span className="text-sm font-medium">2% desde a última semana</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-gray-500 text-sm font-medium">Hospitais em Manutenção</h3>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">9</p>
                  <div className="flex items-center mt-3 text-red-500">
                    <i className="fas fa-arrow-down mr-1"></i>
                    <span className="text-sm font-medium">3 desde o último mês</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                  <h3 className="text-gray-500 text-sm font-medium">Novos Hospitais (30d)</h3>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">6</p>
                  <div className="flex items-center mt-3 text-green-500">
                    <i className="fas fa-arrow-up mr-1"></i>
                    <span className="text-sm font-medium">50% crescimento</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                  <button 
                    className={`px-6 py-4 font-medium ${
                      activeHospitalTab === 'list' 
                        ? "text-blue-600 border-b-2 border-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveHospitalTab('list')}
                  >
                    Lista de Hospitais
                  </button>
                  <button 
                    className={`px-6 py-4 font-medium ${
                      activeHospitalTab === 'map' 
                        ? "text-blue-600 border-b-2 border-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveHospitalTab('map')}
                  >
                    Mapa de Localização
                  </button>
                  <button 
                    className={`px-6 py-4 font-medium ${
                      activeHospitalTab === 'indicators' 
                        ? "text-blue-600 border-b-2 border-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveHospitalTab('indicators')}
                  >
                    Indicadores
                  </button>
                </div>
                
                <div className="p-6">
                  {activeHospitalTab === 'list' && (
                    <div className="animate-fadeIn">
                      <div className="mb-6">
                        <div className="relative">
                          <input 
                            type="text" 
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                            placeholder="Buscar hospitais por nome, endereço ou responsável..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidade</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidades</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredHospitals.map((hospital) => (
                              <tr key={hospital.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{hospital.name}</td>
                                <td className="px-6 py-4">{hospital.address}</td>
                                <td className="px-6 py-4">{hospital.capacity} leitos</td>
                                <td className="px-6 py-4">{hospital.specialties}</td>
                                <td className="px-6 py-4">{hospital.manager}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    hospital.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {hospital.status === 'ativo' ? 'Ativo' : 'Em manutenção'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex space-x-2">
                                    <button className="text-blue-500 hover:text-blue-700">
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                      <i className="fas fa-trash"></i>
                                    </button>
                                    <button className="text-green-500 hover:text-green-700">
                                      <i className="fas fa-eye"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {activeHospitalTab === 'map' && (
                    <div className="animate-fadeIn">
                      <div className="h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex flex-col items-center justify-center text-blue-800 relative">
                        <i className="fas fa-map-marked-alt text-6xl mb-4"></i>
                        <p className="text-2xl font-bold mb-2">Mapa de Hospitais Interativo</p>
                        <p className="text-lg mb-6">Integração com API de mapas</p>
                        
                        {/* Simulação de pontos no mapa */}
                        <div className="absolute top-1/4 left-1/4">
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                          <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0 left-0"></div>
                        </div>
                        <div className="absolute top-1/3 right-1/3">
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                          <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0 left-0"></div>
                        </div>
                        <div className="absolute bottom-1/3 left-1/3">
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                          <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0 left-0"></div>
                        </div>
                        <div className="absolute bottom-1/4 right-1/4">
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                          <div className="w-4 h-4 bg-red-500 rounded-full absolute top-0 left-0"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeHospitalTab === 'indicators' && (
                    <div className="animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <h2 className="text-xl font-semibold text-gray-700 mb-4">Ocupação Hospitalar</h2>
                          <div className="space-y-4">
                            {hospitals.slice(0, 4).map((hospital) => (
                              <div key={hospital.id}>
                                <div className="flex justify-between mb-1">
                                  <span>{hospital.name}</span>
                                  <span className="font-medium">85%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${Math.min(85 + hospital.id * 2, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                          <h2 className="text-xl font-semibold text-gray-700 mb-4">Distribuição por Especialidade</h2>
                          <div className="space-y-4">
                            {[
                              { name: "Cardiologia", value: 25 },
                              { name: "Oncologia", value: 18 },
                              { name: "Pediatria", value: 15 },
                              { name: "Ortopedia", value: 12 },
                              { name: "Neurologia", value: 10 },
                              { name: "Outros", value: 20 }
                            ].map((specialty, index) => (
                              <div key={index}>
                                <div className="flex justify-between mb-1">
                                  <span>{specialty.name}</span>
                                  <span className="font-medium">{specialty.value}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="h-2.5 rounded-full" 
                                    style={{ 
                                      width: `${specialty.value}%`,
                                      backgroundColor: index === 0 ? '#3b82f6' : 
                                        index === 1 ? '#10b981' : 
                                        index === 2 ? '#8b5cf6' : 
                                        index === 3 ? '#f59e0b' : 
                                        index === 4 ? '#ef4444' : '#6b7280'
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestão de Usuários</h1>
                <div className="flex space-x-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <i className="fas fa-user-plus mr-2"></i> Novo Usuário
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <i className="fas fa-download mr-2"></i> Exportar
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                  <button 
                    className={`px-6 py-4 font-medium ${
                      activeUserTab === 'patients' 
                        ? "text-blue-600 border-b-2 border-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveUserTab('patients')}
                  >
                    Pacientes
                  </button>
                  <button 
                    className={`px-6 py-4 font-medium ${
                      activeUserTab === 'professionals' 
                        ? "text-blue-600 border-b-2 border-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveUserTab('professionals')}
                  >
                    Profissionais de Saúde
                  </button>
                  <button 
                    className={`px-6 py-4 font-medium ${
                      activeUserTab === 'admins' 
                        ? "text-blue-600 border-b-2 border-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveUserTab('admins')}
                  >
                    Administradores
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Buscar por nome..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">BI</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Buscar por BI..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Todos</option>
                        <option>Ativo</option>
                        <option>Inativo</option>
                        <option>Pendente</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BI</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Acesso</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(activeUserTab === "patients" || activeUserTab === "professionals" || activeUserTab === "admins")
                          ? filteredUsers.map((user) => (
                              <tr key={user.cpf || user.bi || user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3">
                                      {user.id}
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">{user.name}</div>
                                      <div className="text-sm text-gray-500">{user.type}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">{user.bi || user.cpf || "-"}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.lastAccess}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === 'Ativo' 
                                      ? 'bg-green-100 text-green-800' 
                                      : user.status === 'Pendente' 
                                        ? 'bg-yellow-100 text-yellow-800' 
                                        : 'bg-red-100 text-red-800'
                                  }`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex space-x-2">
                                    <button className="text-blue-500 hover:text-blue-700">
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                      <i className="fas fa-trash"></i>
                                    </button>
                                    <button className="text-green-500 hover:text-green-700">
                                      <i className="fas fa-chart-line"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : users.map((user) => (
                              <tr key={user.cpf || user.bi || user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3">
                                      {user.id}
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">{user.name}</div>
                                      <div className="text-sm text-gray-500">{user.type}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">{user.bi || user.cpf || "-"}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.lastAccess}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === 'Ativo' 
                                      ? 'bg-green-100 text-green-800' 
                                      : user.status === 'Pendente' 
                                        ? 'bg-yellow-100 text-yellow-800' 
                                        : 'bg-red-100 text-red-800'
                                  }`}>
                                    {user.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex space-x-2">
                                    <button className="text-blue-500 hover:text-blue-700">
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700">
                                      <i className="fas fa-trash"></i>
                                    </button>
                                    <button className="text-green-500 hover:text-green-700">
                                      <i className="fas fa-chart-line"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === "statistics" && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Estatísticas</h1>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Atendimentos Mensais</h3>
                    <p className="text-3xl font-bold text-blue-900">12,458</p>
                    <div className="flex items-center mt-3 text-green-500">
                      <i className="fas fa-arrow-up mr-1"></i>
                      <span className="text-sm font-medium">15% desde o mês passado</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Novos Pacientes</h3>
                    <p className="text-3xl font-bold text-green-900">1,248</p>
                    <div className="flex items-center mt-3 text-green-500">
                      <i className="fas fa-arrow-up mr-1"></i>
                      <span className="text-sm font-medium">8% desde o mês passado</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Taxa de Ocupação</h3>
                    <p className="text-3xl font-bold text-purple-900">85%</p>
                    <div className="flex items-center mt-3 text-red-500">
                      <i className="fas fa-arrow-down mr-1"></i>
                      <span className="text-sm font-medium">2% desde a semana passada</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Distribuição de Atendimentos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Cardiologia</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-600 h-3 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Pediatria</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-600 h-3 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Ortopedia</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-600 h-3 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Oncologia</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === "financial" && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Financeiro</h1>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Receita Total</h3>
                    <p className="text-3xl font-bold text-blue-900">R$ 2.458.750</p>
                    <div className="flex items-center mt-3 text-green-500">
                      <i className="fas fa-arrow-up mr-1"></i>
                      <span className="text-sm font-medium">12% desde o trimestre passado</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Despesas Operacionais</h3>
                    <p className="text-3xl font-bold text-green-900">R$ 1.248.500</p>
                    <div className="flex items-center mt-3 text-green-500">
                      <i className="fas fa-arrow-down mr-1"></i>
                      <span className="text-sm font-medium">5% desde o mês passado</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Lucro Líquido</h3>
                    <p className="text-3xl font-bold text-purple-900">R$ 1.210.250</p>
                    <div className="flex items-center mt-3 text-green-500">
                      <i className="fas fa-arrow-up mr-1"></i>
                      <span className="text-sm font-medium">18% desde o trimestre passado</span>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Convênio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Mensal</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pacientes</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxa de Crescimento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: "Unimed", value: "R$ 458.750", patients: "1.248", growth: "12%", status: "Ativo" },
                        { name: "Amil", value: "R$ 325.900", patients: "985", growth: "8%", status: "Ativo" },
                        { name: "Bradesco Saúde", value: "R$ 298.500", patients: "845", growth: "15%", status: "Ativo" },
                        { name: "SulAmérica", value: "R$ 215.300", patients: "625", growth: "5%", status: "Ativo" },
                        { name: "NotreDame Intermédica", value: "R$ 198.400", patients: "562", growth: "18%", status: "Ativo" }
                      ].map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium">{item.name}</td>
                          <td className="px-6 py-4">{item.value}</td>
                          <td className="px-6 py-4">{item.patients}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-green-500">
                              <i className="fas fa-arrow-up mr-1"></i>
                              <span>{item.growth}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Configurações do Sistema</h1>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Permissões de Acesso</h3>
                    <div className="space-y-4">
                      {[
                        { role: "Administrador", permissions: "Acesso total ao sistema" },
                        { role: "Médico", permissions: "Visualizar pacientes, registrar atendimentos" },
                        { role: "Enfermeiro", permissions: "Registrar sinais vitais, administrar medicamentos" },
                        { role: "Recepcionista", permissions: "Agendar consultas, registrar pacientes" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <div className="font-medium">{item.role}</div>
                            <div className="text-sm text-gray-500">{item.permissions}</div>
                          </div>
                          <button className="text-blue-500 hover:text-blue-700">
                            <i className="fas fa-edit"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                      <i className="fas fa-plus mr-2"></i> Adicionar Novo Perfil
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Configurações de Segurança</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Autenticação em Dois Fatores</div>
                          <div className="text-sm text-gray-500">Requer verificação adicional para login</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Histórico de Login</div>
                          <div className="text-sm text-gray-500">Registrar todos os acessos ao sistema</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Bloqueio de Conta</div>
                          <div className="text-sm text-gray-500">Bloquear após 5 tentativas falhas de login</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Backup do Sistema</h3>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <div className="font-medium">Último Backup: 14/08/2025 23:45</div>
                      <div className="text-sm text-gray-500">Próximo backup agendado para hoje às 02:00</div>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                        <i className="fas fa-redo mr-2"></i> Executar Agora
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                        <i className="fas fa-download mr-2"></i> Baixar Backup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;