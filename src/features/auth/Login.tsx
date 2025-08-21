import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Configuração do Firebase (substitua com suas credenciais)
const firebaseConfig = {
  apiKey: "AIzaSyDJARbQHXV9eGtl1ftJkeoEk-t04ZNGmK4",
  authDomain: "moyo-63267.firebaseapp.com",
  projectId: "moyo-63267",
  storageBucket: "moyo-63267.firebasestorage.app",
  messagingSenderId: "475390838922",
  appId: "1:475390838922:web:90b4044ecd8124c15bc573"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const idiomas = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "kimbundo", label: "Kimbundo" },
  { code: "umbundo", label: "Umbundo" },
  { code: "tchoque", label: "Tchoque" },
];

// Componente para as partículas animadas
const FloatingParticles = () => {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="absolute bottom-0 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            borderRadius: '50%',
            backgroundColor: i % 3 === 0 ? '#4F46E5' : i % 3 === 1 ? '#10B981' : '#EC4899',
            animation: `floatUp ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <div 
          key={`heart-${i}`}
          className="absolute bottom-0 text-pink-500 opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 15}px`,
            animation: `floatUp ${Math.random() * 15 + 15}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        >
          <i className="fas fa-heart" />
        </div>
      ))}
    </>
  );
};

export default function Login() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [perfil, setPerfil] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      setIsMounted(false);
    };
  }, []);

  // Login com Google
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem("moyo-auth", "true");
      localStorage.setItem("moyo-perfil", "paciente");
      localStorage.setItem("moyo-user", JSON.stringify({
        nome: user.displayName,
        email: user.email,
        foto: user.photoURL,
        uid: user.uid,
        google: true
      }));
      navigate("/paciente");
    } catch (err: any) {
      setError("Falha ao autenticar com o Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!perfil) {
      setError(t('loginSelecionePerfil') || "Selecione um perfil");
      return;
    }
    if (!password) {
      setError(t('loginPreenchaSenha') || "Preencha a senha");
      return;
    }
    setLoading(true);
    
    // Verificação de login simulado
    if (
      (perfil === "paciente" && email === "pac@moyo.com" && password === "1") ||
      (perfil === "profissional" && email === "pro@moyo.com" && password === "1")
    ) {
      setTimeout(() => {
        localStorage.setItem("moyo-auth", "true");
        localStorage.setItem("moyo-perfil", perfil);
        setLoading(false);
        if (perfil === "paciente") {
          navigate("/paciente");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
      return;
    }
    
    // Admin login
    if (
      perfil === "profissional" &&
      email === "Moyo@moyo.com" &&
      password === "Moyo.Admin"
    ) {
      setTimeout(() => {
        localStorage.setItem("moyo-auth", "true");
        localStorage.setItem("moyo-perfil", "admin");
        setLoading(false);
  navigate("/admin");
      }, 1000);
      return;
    }
    
    // Login via API
    let url = "";
    const apiHost = window.location.hostname;
    if (perfil === "paciente") {
      url = `http://${apiHost}:4000/login`;
    } else if (perfil === "profissional") {
      url = `http://${apiHost}:4000/login-profissional`;
    }
    
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha: password })
    })
      .then(async (response) => {
        setLoading(false);
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Credenciais inválidas. Verifique seu e-mail, senha e perfil.");
          return;
        }
        const data = await response.json();
        localStorage.setItem("moyo-auth", "true");
        localStorage.setItem("moyo-perfil", perfil);
        localStorage.setItem("moyo-user", JSON.stringify(data));
        if (perfil === "paciente") {
          navigate("/paciente");
        } else {
          navigate("/dashboard");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Erro ao conectar ao servidor.");
      });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-50 to-green-100 py-6 px-4 transition-all duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 50}px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .floating { animation: float 3s ease-in-out infinite; }
        .pulsing { animation: pulse 2s ease-in-out infinite; }
        
        .login-container {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -5px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          max-height: 90vh;
        }
        
        .social-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .perfil-btn {
          transition: all 0.2s ease;
        }
        .perfil-btn:hover {
          transform: scale(1.03);
        }
        
        .input-field:focus {
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        
        @media (max-width: 1024px) {
          .login-container {
            flex-direction: column;
            max-width: 90vw;
            max-height: none;
          }
          .login-left, .login-right {
            width: 100%;
          }
          .login-left {
            padding: 2rem 1.5rem;
          }
        }
        
        @media (max-width: 640px) {
          .perfil-btn {
            min-width: 100%;
          }
          .social-btn {
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1rem;
          }
        }
      `}</style>

      {/* Seletor de idioma */}
      <div className="absolute top-4 right-4 z-50">
        <select
          className="border rounded-lg px-3 py-1.5 text-moyo-primary font-semibold shadow focus:ring focus:ring-moyo-primary transition-all duration-200 bg-white hover:bg-gray-50 cursor-pointer text-sm"
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {idiomas.map(idioma => (
            <option key={idioma.code} value={idioma.code}>{idioma.label}</option>
          ))}
        </select>
      </div>
      
      <div className="login-container flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-2xl overflow-hidden transition-transform duration-300">
        {/* Lado esquerdo institucional */}
        <div className="login-left flex-1 bg-gradient-to-br from-moyo-primary to-moyo-secondary text-white p-6 md:p-8 flex flex-col justify-center relative overflow-hidden min-h-[300px]">
          <FloatingParticles />
          
          <div className="absolute w-52 h-52 bg-white/10 rounded-full -top-10 -left-10 z-0 floating" />
          <div className="absolute w-36 h-36 bg-white/10 rounded-full bottom-[-20px] right-16 z-0 floating" style={{ animationDelay: "1.5s" }} />
          
          <div className="relative z-10">
            <div className="flex items-center mb-6 animate-fadeIn">
              <span className="text-4xl mr-3 transform transition-all duration-700 hover:rotate-12">
                <i className="fas fa-heartbeat pulsing"></i>
              </span>
              <span className="text-3xl font-extrabold">Moyo</span>
            </div>
            
            {!isMobile && (
              <>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                  {t('loginBemVindo') || "Bem-vindo ao Moyo"}
                </h1>
                
                <p className="text-base md:text-lg mb-6 opacity-90 max-w-md animate-fadeIn" style={{ animationDelay: "0.4s" }}>
                  {t('loginMensagem') || "Sua plataforma de saúde completa e integrada"}
                </p>
                
                <div className="flex flex-col gap-4 mt-4 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
                  <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1">
                    <i className="fas fa-shield-alt bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm"></i>
                    <span className="text-sm md:text-base">{t('loginSeguroCriptografia') || "Segurança com criptografia avançada"}</span>
                  </div>
                  <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1" style={{ transitionDelay: "0.1s" }}>
                    <i className="fas fa-bolt bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm"></i>
                    <span className="text-sm md:text-base">{t('loginTriagemIA') || "Triagem inteligente com IA"}</span>
                  </div>
                  <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1" style={{ transitionDelay: "0.2s" }}>
                    <i className="fas fa-mobile-alt bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm"></i>
                    <span className="text-sm md:text-base">{t('loginAcessoDispositivo') || "Acesso em qualquer dispositivo"}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Lado direito: formulário */}
        <div className="login-right flex-1 p-6 md:p-8 flex flex-col justify-center bg-white">
          {isMobile && (
            <div className="flex items-center justify-center mb-6 animate-fadeIn">
              <span className="text-4xl mr-3 transform transition-all duration-700 hover:rotate-12 text-moyo-primary">
                <i className="fas fa-heartbeat pulsing"></i>
              </span>
              <span className="text-3xl font-extrabold text-moyo-primary">Moyo</span>
            </div>
          )}
          
          <div className="flex justify-end mb-4">
            <a href="/" className="flex items-center gap-2 text-moyo-primary font-medium hover:text-moyo-secondary transition-all duration-300 group text-sm">
              <i className="fas fa-arrow-left transition-transform duration-300 group-hover:-translate-x-1 text-xs"></i> 
              {t('voltarPaginaInicial') || "Voltar à página inicial"}
            </a>
          </div>
          
          <div className="text-center mb-6 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{t('loginAcesseConta') || "Acesse sua conta"}</h1>
            <p className="text-gray-500 text-xs md:text-sm">{t('loginInsiraCredenciais') || "Insira suas credenciais para continuar"}</p>
          </div>
          
          {error && (
            <div className="mb-3 p-2 rounded-lg bg-red-50 text-red-600 text-center animate-shake border border-red-100 text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4 flex flex-wrap gap-2 justify-center animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <button
              type="button"
              className={`perfil-btn px-4 py-2.5 rounded-lg font-semibold border-2 transition-all flex-1 min-w-[120px] flex items-center justify-center text-sm ${
                perfil === "paciente" 
                  ? "bg-moyo-primary text-white border-moyo-primary" 
                  : "bg-white text-moyo-primary border-moyo-primary/30 hover:border-moyo-primary"
              }`}
              onClick={() => setPerfil("paciente")}
            >
              <i className="fas fa-user-injured mr-1.5 text-sm"></i> {t('loginPaciente') || "Paciente"}
            </button>
            
            <button
              type="button"
              className={`perfil-btn px-4 py-2.5 rounded-lg font-semibold border-2 transition-all flex-1 min-w-[120px] flex items-center justify-center text-sm ${
                perfil === "profissional" 
                  ? "bg-moyo-primary text-white border-moyo-primary" 
                  : "bg-white text-moyo-primary border-moyo-primary/30 hover:border-moyo-primary"
              }`}
              onClick={() => setPerfil("profissional")}
            >
              <i className="fas fa-user-md mr-1.5 text-sm"></i> {t('loginProfissional') || "Profissional"}
            </button>
          </div>
          
          <form className="login-form flex flex-col gap-4 animate-fadeIn" style={{ animationDelay: "0.6s" }} onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group relative">
              <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="email"
                id="email"
                className="input-field w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-moyo-primary focus:ring-0 outline-none bg-gray-50 transition-all duration-300"
                placeholder={t('loginEmail') || "E-mail"}
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
            
            <div className="form-group relative">
              <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input-field w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-moyo-primary focus:ring-0 outline-none bg-gray-50 transition-all duration-300"
                placeholder={t('loginSenha') || "Senha"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-moyo-primary focus:outline-none transition-colors duration-300 text-sm"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
              <div className="flex items-center gap-1.5">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="accent-moyo-primary w-3.5 h-3.5 cursor-pointer rounded focus:ring-moyo-primary" 
                />
                <label htmlFor="remember" className="cursor-pointer select-none">{t('loginLembrarMe') || "Lembrar-me"}</label>
              </div>
              <a href="#" className="text-moyo-primary hover:underline font-medium transition-colors duration-300 text-xs">
                {t('loginEsqueceuSenha') || "Esqueceu a senha?"}
              </a>
            </div>
            
            <button 
              type="submit" 
              className="login-button bg-moyo-primary text-white py-2.5 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:bg-moyo-primary/90 hover:shadow disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin text-sm"></i> 
                  {t('loginEntrar') || "Entrar"}...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt text-sm"></i> 
                  {t('loginEntrar') || "Entrar"}
                </>
              )}
            </button>
          </form>
          
          <div className="divider flex items-center my-4 text-gray-400 animate-fadeIn" style={{ animationDelay: "0.8s" }}>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-xs">{t('loginOuEntrarCom') || "Ou entre com"}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          
          <div className="social-login flex justify-center gap-3 mb-4 animate-fadeIn" style={{ animationDelay: "1s" }}>
            <button
              type="button"
              className="social-btn w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-700 text-base border border-gray-200 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
              onClick={handleGoogleLogin}
              disabled={loading}
              title="Entrar com Google"
            >
              <i className="fab fa-google"></i>
            </button>
            <button 
              className="social-btn w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-700 text-base border border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              title="Entrar com Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </button>
            <button 
              className="social-btn w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-700 text-base border border-gray-200 hover:bg-gray-800 hover:text-white transition-all duration-300"
              title="Entrar com Apple"
            >
              <i className="fab fa-apple"></i>
            </button>
          </div>
          
          <div className="signup-link text-center text-gray-500 text-xs animate-fadeIn" style={{ animationDelay: "1.2s" }}>
            {t('loginNaoTemConta') || "Não tem uma conta?"}{' '}
            <a href="/signup" className="text-moyo-primary font-semibold hover:underline transition-colors duration-300">
              {t('loginCadastrarAgora') || "Cadastre-se agora"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}