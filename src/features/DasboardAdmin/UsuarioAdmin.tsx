import React from 'react';

const UsuarioAdmin = ({ users, activeUserTab, setActiveUserTab, searchTerm, setSearchTerm }: any) => (
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
);

export default UsuarioAdmin;
