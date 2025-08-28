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