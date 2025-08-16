import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "@fortawesome/fontawesome-free/css/all.min.css";

const idiomas = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "kimbundo", label: "Kimbundo" },
  { code: "umbundo", label: "Umbundo" },
  { code: "tchoque", label: "Tchoque" },
];

export default function Login() {
  const { t, i18n } = useTranslation();
  console.log('LANG:', i18n.language, 'BEMVINDO:', t('loginBemVindo'));
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [perfil, setPerfil] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Login com Google
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Você pode customizar o perfil conforme necessário
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

  const handleChangeIdioma = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!perfil) {
      setError(t('loginSelecionePerfil'));
      return;
    }
    if (!password) {
      setError(t('loginPreenchaSenha'));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Simulação de autenticação local
      if (
        (perfil === "paciente" && email === "pac@moyo.com" && password === "1") ||
        (perfil === "profissional" && email === "pro@moyo.com" && password === "1")
      ) {
        localStorage.setItem("moyo-auth", "true");
        localStorage.setItem("moyo-perfil", perfil);
        setLoading(false);
        if (perfil === "paciente") {
          navigate("/paciente");
        } else {
          navigate("/dashboard");
        }
        return;
      }
      // Admin login
      if (
        perfil === "profissional" &&
        email === "Moyo@moyo.com" &&
        password === "Moyo.Admin"
      ) {
        localStorage.setItem("moyo-auth", "true");
        localStorage.setItem("moyo-perfil", "admin");
        setLoading(false);
        navigate("/admin");
        return;
      }
    }, 1000);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-50 to-green-100 py-6 px-2">
      {/* Seletor de idioma */}
      <div className="absolute top-4 right-4 z-50">
        <select
          className="border rounded px-3 py-1 text-moyo-primary font-semibold shadow focus:ring focus:ring-moyo-primary"
          value={i18n.language}
          onChange={e => i18n.changeLanguage(e.target.value)}
        >
          {idiomas.map(idioma => (
            <option key={idioma.code} value={idioma.code}>{idioma.label}</option>
          ))}
        </select>
      </div>
      <div className="login-container flex w-full max-w-4xl min-h-[600px] bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Lado esquerdo institucional */}
        <div className="login-left flex-1 bg-gradient-to-br from-moyo-primary to-moyo-secondary text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute w-52 h-52 bg-white/10 rounded-full top-[-50px] left-[-50px] z-0" />
          <div className="absolute w-36 h-36 bg-white/10 rounded-full bottom-[-30px] right-24 z-0" />
          <div className="absolute w-28 h-28 bg-white/10 rounded-full top-1/2 left-2/3 z-0" />
          <div className="relative z-10">
            <div className="flex items-center mb-10">
              <span className="text-4xl mr-4"><i className="fas fa-heartbeat"></i></span>
              <span className="text-3xl font-extrabold">Moyo</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{t('loginBemVindo')}</h1>
            <p className="text-lg mb-8 opacity-90 max-w-md">{t('loginMensagem')}</p>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-3"><i className="fas fa-shield-alt bg-white/20 w-9 h-9 rounded-full flex items-center justify-center"></i><span>{t('loginSeguroCriptografia')}</span></div>
              <div className="flex items-center gap-3"><i className="fas fa-bolt bg-white/20 w-9 h-9 rounded-full flex items-center justify-center"></i><span>{t('loginTriagemIA')}</span></div>
              <div className="flex items-center gap-3"><i className="fas fa-mobile-alt bg-white/20 w-9 h-9 rounded-full flex items-center justify-center"></i><span>{t('loginAcessoDispositivo')}</span></div>
            </div>
          </div>
          
        </div>
        {/* Lado direito: formulário */}
        <div className="login-right flex-1 p-10 flex flex-col justify-center">
          <div className="flex justify-end mb-4">
            <a href="/" className="flex items-center gap-2 text-moyo-primary font-medium hover:text-moyo-secondary transition-all text-base">
              <i className="fas fa-arrow-left"></i> Voltar à página inicial
            </a>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-moyo-dark mb-2">{t('loginAcesseConta')}</h1>
            <p className="text-moyo-gray text-base">{t('loginInsiraCredenciais')}</p>
          </div>
          {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
          <div className="mb-4 flex gap-2 justify-center">
            <button
              type="button"
              className={`px-4 py-2 rounded font-semibold border-2 transition-all ${perfil === "paciente" ? "bg-moyo-primary text-white border-moyo-primary" : "bg-transparent text-moyo-primary border-moyo-primary"}`}
              onClick={() => setPerfil("paciente")}
            >
              <i className="fas fa-user-injured mr-2"></i> {t('loginPaciente')}
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded font-semibold border-2 transition-all ${perfil === "profissional" ? "bg-moyo-primary text-white border-moyo-primary" : "bg-transparent text-moyo-primary border-moyo-primary"}`}
              onClick={() => setPerfil("profissional")}
            >
              <i className="fas fa-user-md mr-2"></i> {t('loginProfissional')}
            </button>
          </div>
          <form className="login-form flex flex-col gap-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group relative">
              <i className="fas fa-envelope input-icon absolute left-4 top-4 text-moyo-gray"></i>
              <input
                type="email"
                id="email"
                className="peer w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-base focus:border-moyo-primary focus:ring-2 focus:ring-moyo-primary outline-none bg-gray-50"
                placeholder={t('loginEmail')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="form-group relative">
              <i className="fas fa-lock input-icon absolute left-4 top-4 text-moyo-gray"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="peer w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg text-base focus:border-moyo-primary focus:ring-2 focus:ring-moyo-primary outline-none bg-gray-50"
                placeholder={t('loginSenha')}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-4 top-3 text-moyo-gray hover:text-moyo-primary focus:outline-none"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
            <div className="flex justify-between items-center text-sm text-moyo-gray">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-moyo-primary w-4 h-4" />
                <label htmlFor="remember">{t('loginLembrarMe')}</label>
              </div>
              <a href="#" className="text-moyo-primary hover:underline font-medium">{t('loginEsqueceuSenha')}</a>
            </div>
            <button type="submit" className="login-button bg-moyo-primary text-white py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-moyo-secondary disabled:opacity-60" disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin"></i> {t('loginEntrar')}...</> : <><i className="fas fa-sign-in-alt"></i> {t('loginEntrar')}</>}
            </button>
          </form>
          <div className="divider flex items-center my-6 text-moyo-gray">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-4">{t('loginOuEntrarCom')}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="social-login flex justify-center gap-4 mb-4">
            <button
              type="button"
              className="social-btn google w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-moyo-dark text-xl border border-gray-200 hover:bg-red-600 hover:text-white transition-all"
              onClick={handleGoogleLogin}
              disabled={loading}
              title="Entrar com Google"
            >
              <i className="fab fa-google"></i>
            </button>
            <button className="social-btn facebook w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-moyo-dark text-xl border border-gray-200 hover:bg-blue-600 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></button>
            <button className="social-btn apple w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-moyo-dark text-xl border border-gray-200 hover:bg-black hover:text-white transition-all"><i className="fab fa-apple"></i></button>
          </div>
          <div className="signup-link text-center text-moyo-gray mt-2">
            {t('loginNaoTemConta')} <a href="/signup" className="text-moyo-primary font-semibold hover:underline">{t('loginCadastrarAgora')}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
