import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeHospitalTab, setActiveHospitalTab] = useState("list");
  const [activeUserTab, setActiveUserTab] = useState("patients");
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [hospitalForm, setHospitalForm] = useState({
    // Redireciona para o novo AdminDashboard da pasta DasboardAdmin
    export { default } from '../DasboardAdmin/AdminDashboard';
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{hospital.nome || hospital.name}</td>
                                <td className="px-6 py-4">{hospital.endereco || hospital.address}</td>
                                <td className="px-6 py-4">{hospital.capacidade || hospital.capacity || '-'} leitos</td>
                                <td className="px-6 py-4">{hospital.areas_trabalho || hospital.specialties}</td>
                                <td className="px-6 py-4">{hospital.responsavel || hospital.manager || '-'}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    (hospital.status === 'ativo' || hospital.status === 'Ativo') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {(hospital.status === 'ativo' || hospital.status === 'Ativo') ? 'Ativo' : 'Em manutenção'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex space-x-2">
                                    <button className="text-blue-500 hover:text-blue-700" title="Editar" onClick={() => openEditHospital(hospital)}>
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700" title="Remover" onClick={() => openDeleteHospital(hospital)}>
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                  {/* Modal de confirmação de remoção */}
                  {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative animate-fadeIn">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowDeleteModal(false)}>
                          <i className="fas fa-times"></i>
                        </button>
                        <h2 className="text-xl font-bold mb-4">Remover hospital</h2>
                        <p className="mb-6">Tem certeza que deseja remover <span className="font-semibold">{hospitalToDelete?.nome || hospitalToDelete?.name}</span>?</p>
                        <div className="flex gap-4">
                          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleDeleteHospital}>Remover</button>
                          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                        </div>
                      </div>
                    </div>
                  )}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Buscar por CPF..."
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Acesso</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                          <tr key={user.cpf} className="hover:bg-gray-50 transition-colors">
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
                            <td className="px-6 py-4">{user.cpf}</td>
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
}

export default AdminDashboard;