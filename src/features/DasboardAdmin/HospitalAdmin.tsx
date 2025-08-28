import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

// Dummy icon for Marker (replace with your own if needed)
const markerIcon = undefined;

// Dummy LocationPicker (replace with your own if needed)
const LocationPicker = ({ onSelect }: { onSelect: (lat: number, lng: number) => void }) => null;

interface Hospital {
  id: number;
  nome?: string;
  name?: string;
  endereco?: string;
  address?: string;
  capacidade?: number;
  capacity?: number;
  areas_trabalho?: string;
  specialties?: string;
  responsavel?: string;
  manager?: string;
  status?: string;
  latitude?: string;
  longitude?: string;
}

const initialForm = {
  nome: '', endereco: '', cidade: '', provincia: '', latitude: '', longitude: '',
  areas_trabalho: '', exames_disponiveis: '', telefone: '', email: '', site: ''
};

const HospitalAdmin: React.FC = () => {
  // Dummy hospitals data (replace with real fetch if needed)
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [editHospital, setEditHospital] = useState<Hospital | null>(null);
  const [hospitalForm, setHospitalForm] = useState(initialForm);
  const [errorHosp, setErrorHosp] = useState<string | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapSearch, setMapSearch] = useState('');
  const [mapSearchLoading, setMapSearchLoading] = useState(false);
  const [mapSearchResults, setMapSearchResults] = useState<any[]>([]);
  const [mapPickerCenter, setMapPickerCenter] = useState<[number, number]>([-8.839, 13.289]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hospitalToDelete, setHospitalToDelete] = useState<Hospital | null>(null);
  const [activeHospitalTab, setActiveHospitalTab] = useState<'list' | 'map' | 'indicators'>('list');

  // Filtered hospitals
  const filteredHospitals = hospitals.filter(h => {
    const term = searchTerm.toLowerCase();
    return (
      (h.nome || h.name || '').toLowerCase().includes(term) ||
      (h.endereco || h.address || '').toLowerCase().includes(term) ||
      (h.responsavel || h.manager || '').toLowerCase().includes(term)
    );
  });

  // Handlers
  const handleHospitalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHospitalForm({ ...hospitalForm, [e.target.name]: e.target.value });
  };
  const handleHospitalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorHosp(null);
    // Dummy add
    setHospitals([...hospitals, { ...hospitalForm, id: Date.now() } as Hospital]);
    setShowHospitalModal(false);
    setHospitalForm(initialForm);
  };
  const handleEditHospitalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorHosp(null);
    if (!editHospital) return;
    setHospitals(hospitals.map(h => h.id === editHospital.id ? { ...editHospital, ...hospitalForm } : h));
    setShowHospitalModal(false);
    setEditHospital(null);
    setHospitalForm(initialForm);
  };
  const openEditHospital = (hospital: Hospital) => {
    setEditHospital(hospital);
    setHospitalForm({
      nome: hospital.nome || hospital.name || '',
      endereco: hospital.endereco || hospital.address || '',
      cidade: '', provincia: '', latitude: hospital.latitude || '', longitude: hospital.longitude || '',
      areas_trabalho: hospital.areas_trabalho || hospital.specialties || '', exames_disponiveis: '', telefone: '', email: '', site: ''
    });
    setShowHospitalModal(true);
  };
  const openDeleteHospital = (hospital: Hospital) => {
    setHospitalToDelete(hospital);
    setShowDeleteModal(true);
  };
  const handleDeleteHospital = () => {
    if (hospitalToDelete) {
      setHospitals(hospitals.filter(h => h.id !== hospitalToDelete.id));
      setShowDeleteModal(false);
      setHospitalToDelete(null);
    }
  };
  const handleMapSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMapSearchLoading(true);
    // Dummy search
    setTimeout(() => {
      setMapSearchResults([
        { lat: '-8.839', lon: '13.289', display_name: 'Luanda, Angola' }
      ]);
      setMapSearchLoading(false);
    }, 1000);
  };

  return (
    <div className="animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Gestão de Hospitais</h1>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => { setShowHospitalModal(true); setEditHospital(null); }}>
                    <i className="fas fa-plus mr-2"></i> Adicionar Hospital
                  </button>

                  {/* Modal de cadastro de hospital */}
                  {showHospitalModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative animate-fadeIn">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowHospitalModal(false)}>
                          <i className="fas fa-times"></i>
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{editHospital ? 'Editar' : 'Cadastrar'} Hospital/Clínica</h2>
                        <form onSubmit={editHospital ? handleEditHospitalSubmit : handleHospitalSubmit} className="space-y-4">
                          <input className="w-full border p-2 rounded" name="nome" placeholder="Nome" value={hospitalForm.nome} onChange={handleHospitalInput} required />
                          <input className="w-full border p-2 rounded" name="endereco" placeholder="Endereço" value={hospitalForm.endereco} onChange={handleHospitalInput} />
                          <input className="w-full border p-2 rounded" name="cidade" placeholder="Cidade" value={hospitalForm.cidade} onChange={handleHospitalInput} />
                          <input className="w-full border p-2 rounded" name="provincia" placeholder="Província" value={hospitalForm.provincia} onChange={handleHospitalInput} />
                          <div className="flex gap-2">
                            <input className="w-full border p-2 rounded" name="latitude" placeholder="Latitude" value={hospitalForm.latitude} onChange={handleHospitalInput} />
                            <input className="w-full border p-2 rounded" name="longitude" placeholder="Longitude" value={hospitalForm.longitude} onChange={handleHospitalInput} />
                            <button type="button" className="bg-blue-200 px-2 rounded text-blue-700" onClick={() => setShowMapPicker(true)}>Mapa</button>
                          </div>
                          <input className="w-full border p-2 rounded" name="areas_trabalho" placeholder="Áreas de Trabalho" value={hospitalForm.areas_trabalho} onChange={handleHospitalInput} />
                          <input className="w-full border p-2 rounded" name="exames_disponiveis" placeholder="Exames Disponíveis" value={hospitalForm.exames_disponiveis} onChange={handleHospitalInput} />
                          <input className="w-full border p-2 rounded" name="telefone" placeholder="Telefone" value={hospitalForm.telefone} onChange={handleHospitalInput} />
                          <input className="w-full border p-2 rounded" name="email" placeholder="Email" value={hospitalForm.email} onChange={handleHospitalInput} />
                          <input className="w-full border p-2 rounded" name="site" placeholder="Site" value={hospitalForm.site} onChange={handleHospitalInput} />
                          {errorHosp && <div className="text-red-500 text-sm">{errorHosp}</div>}
                          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">{editHospital ? 'Salvar Alterações' : 'Cadastrar'}</button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Modal de seleção de localização no mapa */}
                  {showMapPicker && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-fadeIn">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowMapPicker(false)}>
                          <i className="fas fa-times"></i>
                        </button>
                        <h2 className="text-xl font-bold mb-2">Selecione a localização no mapa</h2>
                        <form onSubmit={handleMapSearch} className="flex gap-2 mb-2">
                          <input className="flex-1 border p-2 rounded" placeholder="Buscar endereço, bairro, cidade..." value={mapSearch} onChange={e => setMapSearch(e.target.value)} />
                          <button type="submit" className="bg-blue-500 text-white px-3 rounded">Buscar</button>
                        </form>
                        {mapSearchLoading && <div className="text-blue-600 text-sm mb-2">Buscando...</div>}
                        {mapSearchResults.length > 0 && (
                          <div className="mb-2 max-h-32 overflow-y-auto border rounded">
                            {mapSearchResults.map((r, i) => (
                              <div key={i} className="p-2 hover:bg-blue-100 cursor-pointer text-sm" onClick={() => {
                                setHospitalForm({ ...hospitalForm, latitude: r.lat, longitude: r.lon });
                                setMapPickerCenter([parseFloat(r.lat), parseFloat(r.lon)]);
                                setMapSearchResults([]);
                              }}>
                                {r.display_name}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="h-96 w-full">
                          <MapContainer
                            center={
                              hospitalForm.latitude && hospitalForm.longitude && !isNaN(Number(hospitalForm.latitude)) && !isNaN(Number(hospitalForm.longitude))
                                ? [Number(hospitalForm.latitude), Number(hospitalForm.longitude)] as [number, number]
                                : mapPickerCenter as [number, number]
                            }
                            zoom={hospitalForm.latitude && hospitalForm.longitude ? 15 : 6}
                            style={{ height: '100%', width: '100%' }}
                          >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {hospitalForm.latitude && hospitalForm.longitude && !isNaN(Number(hospitalForm.latitude)) && !isNaN(Number(hospitalForm.longitude)) && (
                              <Marker position={[Number(hospitalForm.latitude), Number(hospitalForm.longitude)] as [number, number]} icon={markerIcon} />
                            )}
                            <LocationPicker onSelect={(lat, lng) => {
                              setHospitalForm({ ...hospitalForm, latitude: lat.toString(), longitude: lng.toString() });
                              setMapPickerCenter([lat, lng]);
                              setMapSearchResults([]);
                            }} />
                          </MapContainer>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">Busque um endereço ou clique no mapa para definir latitude e longitude.</div>
                      </div>
                    </div>
                  )}
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
  );
};

export default HospitalAdmin;
