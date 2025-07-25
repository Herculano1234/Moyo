import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const carouselImages = [
  "https://angolafieldgroup.com/wp-content/uploads/2008/04/maria-pia-hospital1.jpg?w=768",
  "https://www.makaangola.org/wp-content/uploads/2021/08/hospital-geral-luanda-860x280.jpg",
  "https://rna.ao/rna.ao/wp-content/uploads/2022/03/5839350E-A2A6-4BB9-B001-0E1AB7331FC5.jpeg"
];

export default function LandingPage() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselInterval = useRef<number | null>(null);

  useEffect(() => {
    carouselInterval.current = window.setInterval(() => {
      setCarouselIdx((idx) => (idx + 1) % carouselImages.length);
    }, 5000);
    return () => {
      if (carouselInterval.current) window.clearInterval(carouselInterval.current);
    };
  }, []);

  // Theme toggle (opcional, pode ser integrado ao sistema de tema global)
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-white dark:bg-gray-800 shadow relative">
        <div className="flex items-center gap-2 text-2xl font-bold text-moyo-primary">
          <i className="fas fa-heartbeat text-red-500 text-4xl"></i>
          Moyo
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          <a href="#home" className="text-gray-700 dark:text-gray-200 hover:text-moyo-primary">Início</a>
          <a href="#about" className="text-gray-700 dark:text-gray-200 hover:text-moyo-primary">Sobre o Sistema</a>
          <a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-moyo-primary">Funcionalidades</a>
          <a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-moyo-primary">Contato</a>
        </nav>
        <div className="hidden md:flex gap-2">
          <Link to="/login" className="px-6 py-2 rounded border-2 border-moyo-primary text-moyo-primary bg-transparent hover:bg-moyo-primary hover:text-white transition font-semibold shadow-sm">Entrar</Link>
          <Link to="/signup" className="px-6 py-2 rounded bg-moyo-primary text-white font-semibold shadow hover:bg-moyo-secondary transition border-2 border-moyo-primary">Cadastrar-se</Link>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-moyo-primary"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Abrir menu"
        >
          <span className="sr-only">Abrir menu</span>
          <svg className="w-6 h-6 text-moyo-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md z-40 flex flex-col md:hidden animate-fade-in">
            <nav className="flex flex-col gap-4 px-6 py-4">
              <a href="#home" className="text-gray-700 dark:text-gray-200 hover:text-moyo-primary" onClick={() => setMobileMenuOpen(false)}>Início</a>
              <a href="#about" className="text-gray-700 dark:text-gray-200 hover:text-moyo-primary" onClick={() => setMobileMenuOpen(false)}>Sobre o Sistema</a>
              <a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-moyo-primary" onClick={() => setMobileMenuOpen(false)}>Funcionalidades</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-200 hover:text-moyo-primary" onClick={() => setMobileMenuOpen(false)}>Contato</a>
              <Link to="/login" className="px-6 py-2 rounded border-2 border-moyo-primary text-moyo-primary bg-transparent hover:bg-moyo-primary hover:text-white transition font-semibold shadow-sm" onClick={() => setMobileMenuOpen(false)}>Entrar</Link>
              <Link to="/signup" className="px-6 py-2 rounded bg-moyo-primary text-white font-semibold shadow hover:bg-moyo-secondary transition border-2 border-moyo-primary" onClick={() => setMobileMenuOpen(false)}>Cadastrar-se</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 bg-gradient-to-br from-moyo-primary/10 to-transparent" id="home">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 flex flex-col items-start gap-6 w-full md:w-auto">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-moyo-primary leading-tight">Acesse a saúde com inteligência.<br /><span className="text-gray-700 dark:text-gray-200 text-lg xs:text-xl md:text-3xl font-normal">Onde você estiver, quando precisar.</span></h1>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 mb-4 w-full">
              <Link to="/login" className="hero-btn btn-patient flex items-center justify-center gap-2 bg-moyo-primary text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow hover:bg-moyo-secondary transition w-full xs:w-auto text-base sm:text-base font-semibold border-2 border-moyo-primary focus:outline-none focus:ring-2 focus:ring-moyo-primary">
                <span className="material-icons align-middle text-lg mr-1"></span> Sou Paciente
              </Link>
              <Link to="/login" className="hero-btn btn-professional flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow hover:bg-blue-700 transition w-full xs:w-auto text-base sm:text-base font-semibold border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                <span className="material-icons align-middle text-lg mr-1"></span> Sou Profissional
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="feature-bubble bg-white dark:bg-gray-800 border px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm sm:text-base"><i className="fas fa-brain"></i> Triagem com IA</span>
              <span className="feature-bubble bg-white dark:bg-gray-800 border px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm sm:text-base"><i className="fas fa-calendar-check"></i> Agendamentos rápidos</span>
              <span className="feature-bubble bg-white dark:bg-gray-800 border px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm sm:text-base"><i className="fas fa-heartbeat"></i> Monitoramento pós-consulta</span>
            </div>
          </div>
          {/* Carousel */}
          <div className="flex-1 flex items-center justify-center w-full md:w-auto mt-8 md:mt-0">
            <div className="w-full max-w-lg sm:max-w-xl md:w-[480px] md:h-[320px] h-64 sm:h-80 md:h-[320px] rounded-xl overflow-hidden shadow-lg relative">
              {carouselImages.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt="Saúde"
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${carouselIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                  style={{ borderRadius: 16 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services py-10 sm:py-14 md:py-16 bg-white dark:bg-gray-800" id="services">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-moyo-primary text-center">Acesso Rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="card bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
              <div className="card-icon text-4xl mb-2">🩺</div>
              <h3 className="card-title text-xl font-semibold mb-2">Atendimento Online</h3>
              <p className="card-description text-gray-600 dark:text-gray-300 text-center">Faça sua triagem e agende consultas de forma rápida e segura com nossos profissionais qualificados.</p>
            </div>
            <div className="card bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
              <div className="card-icon text-4xl mb-2">👨‍⚕️</div>
              <h3 className="card-title text-xl font-semibold mb-2">Área Médica</h3>
              <p className="card-description text-gray-600 dark:text-gray-300 text-center">Acesse fichas de pacientes, histórico médico e controle de atendimentos em um só lugar.</p>
            </div>
            <div className="card bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
              <div className="card-icon text-4xl mb-2">⏱️</div>
              <h3 className="card-title text-xl font-semibold mb-2">Tempo de Espera</h3>
              <p className="card-description text-gray-600 dark:text-gray-300 text-center">Consulte tempos reais de espera nas unidades de saúde e planeje sua visita com antecedência.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about py-10 sm:py-14 md:py-16 bg-gray-100 dark:bg-gray-900" id="about">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 md:gap-10 items-center">
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 w-full md:w-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-moyo-primary mb-2">Tecnologia e Humanização na Gestão da Saúde</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">O Moyo integra soluções digitais avançadas com uma abordagem centrada no ser humano, transformando a experiência em saúde para pacientes e profissionais. Nossa plataforma conecta tecnologia e cuidado para oferecer um atendimento mais eficiente e humano.</p>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-2 sm:mt-4">
              <div className="stat bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                <div className="stat-value text-2xl font-bold text-moyo-primary">40%</div>
                <div className="stat-label text-gray-600 dark:text-gray-300">Redução no tempo de espera</div>
              </div>
              <div className="stat bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                <div className="stat-value text-2xl font-bold text-moyo-primary">80%</div>
                <div className="stat-label text-gray-600 dark:text-gray-300">Triagem mais precisa com IA</div>
              </div>
              <div className="stat bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                <div className="stat-value text-2xl font-bold text-moyo-primary">95%</div>
                <div className="stat-label text-gray-600 dark:text-gray-300">Satisfação do paciente</div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center w-full md:w-auto mt-8 md:mt-0">
            <div className="w-full max-w-lg sm:max-w-xl md:w-[480px] md:h-[320px] h-64 sm:h-80 md:h-[320px] rounded-xl overflow-hidden shadow-lg relative">
              {carouselImages.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt="Saúde"
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${carouselIdx === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                  style={{ borderRadius: 16 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-10 sm:py-14 md:py-16 bg-white dark:bg-gray-800" id="features">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-moyo-primary text-center">Funcionalidades Integradas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="feature-tab bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
              <div className="feature-icon text-3xl mb-2">🤖</div>
              <h3 className="feature-title text-lg font-semibold mb-2">Triagem com IA</h3>
              <p className="feature-description text-gray-600 dark:text-gray-300 text-center">Classificação automática de prioridades com inteligência artificial para atendimento mais eficiente.</p>
            </div>
            <div className="feature-tab bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
              <div className="feature-icon text-3xl mb-2">📅</div>
              <h3 className="feature-title text-lg font-semibold mb-2">Agendamento Inteligente</h3>
              <p className="feature-description text-gray-600 dark:text-gray-300 text-center">Sistema de marcação otimizado conforme disponibilidade de profissionais e recursos.</p>
            </div>
            <div className="feature-tab bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
              <div className="feature-icon text-3xl mb-2">📊</div>
              <h3 className="feature-title text-lg font-semibold mb-2">Painel Médico</h3>
              <p className="feature-description text-gray-600 dark:text-gray-300 text-center">Dashboard completo para acompanhamento de pacientes e gestão de atendimentos.</p>
            </div>
            <div className="feature-tab bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
              <div className="feature-icon text-3xl mb-2">📋</div>
              <h3 className="feature-title text-lg font-semibold mb-2">Prontuário Digital</h3>
              <p className="feature-description text-gray-600 dark:text-gray-300 text-center">Registros médicos integrados e acessíveis de forma segura em qualquer dispositivo.</p>
            </div>
            <div className="feature-tab bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
              <div className="feature-icon text-3xl mb-2">📱</div>
              <h3 className="feature-title text-lg font-semibold mb-2">Acompanhamento Remoto</h3>
              <p className="feature-description text-gray-600 dark:text-gray-300 text-center">Monitoramento pós-consulta via dispositivos móveis para melhor acompanhamento.</p>
            </div>
            <div className="feature-tab bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow flex flex-col items-center">
              <div className="feature-icon text-3xl mb-2">🎓</div>
              <h3 className="feature-title text-lg font-semibold mb-2">Educação e Prevenção</h3>
              <p className="feature-description text-gray-600 dark:text-gray-300 text-center">Conteúdos personalizados para promoção da saúde e prevenção de doenças.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 bg-gray-900 text-gray-300" id="contact">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="text-2xl font-bold text-moyo-primary mb-2">Moyo</div>
            <p className="mb-4">Soluções inovadoras para a saúde digital, conectando tecnologia e cuidado humano para transformar a experiência em saúde.</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white text-lg hover:bg-moyo-primary"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white text-lg hover:bg-moyo-primary"><i className="fab fa-youtube"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white text-lg hover:bg-moyo-primary"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white text-lg hover:bg-moyo-primary"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-moyo-primary">Termos de uso</a></li>
              <li><a href="#" className="hover:text-moyo-primary">Política de privacidade</a></li>
              <li><a href="#" className="hover:text-moyo-primary">Suporte</a></li>
              <li><a href="#" className="hover:text-moyo-primary">FAQ</a></li>
              <li><a href="#" className="hover:text-moyo-primary">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contato</h3>
            <ul className="space-y-2">
              <li><a href="mailto:contato@moyo.com.br" className="hover:text-moyo-primary">contato@moyo.com.br</a></li>
              <li><a href="tel:+5511999999999" className="hover:text-moyo-primary">(+244) 929 754 355</a></li>
              <li>Luanda - LDA, Angola</li>
              <li>Atendimento: Seg-Sex, 8h-18h</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Baixe nosso app</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-white hover:bg-moyo-primary">
                <i className="fab fa-google-play text-2xl"></i>
                <span>
                  <span className="block text-xs">Disponível no</span>
                  <span className="block font-semibold">Google Play</span>
                </span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-white hover:bg-moyo-primary">
                <i className="fab fa-apple text-2xl"></i>
                <span>
                  <span className="block text-xs">Baixe na</span>
                  <span className="block font-semibold">App Store</span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-6 sm:mt-8 border-t border-slate-700 pt-4 sm:pt-6 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Moyo. Todos os direitos reservados.
        </div>
        {/* Theme Toggle */}
        <button
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-moyo-primary text-white flex items-center justify-center shadow-lg text-lg sm:text-xl z-50"
          onClick={() => setDark((d) => !d)}
          aria-label="Alternar tema"
        >
          <i className={`fas ${dark ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </footer>
    </div>
  );
}
