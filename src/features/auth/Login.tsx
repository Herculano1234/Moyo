import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [perfil, setPerfil] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!perfil) {
      setError("Selecione o perfil antes de entrar");
      return;
    }
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password, perfil }), // Corrigido para enviar 'senha' em vez de 'password'
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas. Verifique seu e-mail, senha e perfil.");
      }

      const data = await response.json();
      localStorage.setItem("moyo-auth", data.token);
      localStorage.setItem("moyo-perfil", perfil);
      setLoading(false);

      if (perfil === "paciente") {
        navigate("/paciente");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Erro ao realizar login. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-50 to-green-100 py-6 px-2">
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
            <h1 className="text-3xl font-bold mb-4">Bem-vindo de volta!</h1>
            <p className="text-lg mb-8 opacity-90 max-w-md">Entre na sua conta para acessar a plataforma de gestão hospitalar mais inovadora do mercado.</p>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-3"><i className="fas fa-shield-alt bg-white/20 w-9 h-9 rounded-full flex items-center justify-center"></i><span>Sistema seguro com criptografia de ponta</span></div>
              <div className="flex items-center gap-3"><i className="fas fa-bolt bg-white/20 w-9 h-9 rounded-full flex items-center justify-center"></i><span>Triagem inteligente com IA para priorização</span></div>
              <div className="flex items-center gap-3"><i className="fas fa-mobile-alt bg-white/20 w-9 h-9 rounded-full flex items-center justify-center"></i><span>Acesso de qualquer dispositivo, a qualquer hora</span></div>
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
            <h1 className="text-2xl md:text-3xl font-bold text-moyo-dark mb-2">Acesse sua conta</h1>
            <p className="text-moyo-gray text-base">Insira suas credenciais para entrar no sistema</p>
          </div>
          {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
          <div className="mb-4 flex gap-2 justify-center">
            <button
              type="button"
              className={`px-4 py-2 rounded font-semibold border-2 transition-all ${perfil === "paciente" ? "bg-moyo-primary text-white border-moyo-primary" : "bg-transparent text-moyo-primary border-moyo-primary"}`}
              onClick={() => setPerfil("paciente")}
            >
              <i className="fas fa-user-injured mr-2"></i> Paciente
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded font-semibold border-2 transition-all ${perfil === "profissional" ? "bg-moyo-primary text-white border-moyo-primary" : "bg-transparent text-moyo-primary border-moyo-primary"}`}
              onClick={() => setPerfil("profissional")}
            >
              <i className="fas fa-user-md mr-2"></i> Profissional
            </button>
          </div>
          <form className="login-form flex flex-col gap-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group relative">
              <i className="fas fa-envelope input-icon absolute left-4 top-4 text-moyo-gray"></i>
              <input
                type="email"
                id="email"
                className="peer w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-base focus:border-moyo-primary focus:ring-2 focus:ring-moyo-primary outline-none bg-gray-50"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group relative">
              <i className="fas fa-lock input-icon absolute left-4 top-4 text-moyo-gray"></i>
              <input
                type="password"
                id="password"
                className="peer w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-base focus:border-moyo-primary focus:ring-2 focus:ring-moyo-primary outline-none bg-gray-50"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center text-sm text-moyo-gray">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-moyo-primary w-4 h-4" />
                <label htmlFor="remember">Lembrar-me</label>
              </div>
              <a href="#" className="text-moyo-primary hover:underline font-medium">Esqueceu a senha?</a>
            </div>
            <button type="submit" className="login-button bg-moyo-primary text-white py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all hover:bg-moyo-secondary disabled:opacity-60" disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin"></i> Entrando...</> : <><i className="fas fa-sign-in-alt"></i> Entrar</>}
            </button>
          </form>
          <div className="divider flex items-center my-6 text-moyo-gray">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-4">Ou entre com</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="social-login flex justify-center gap-4 mb-4">
            <button className="social-btn google w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-moyo-dark text-xl border border-gray-200 hover:bg-red-600 hover:text-white transition-all"><i className="fab fa-google"></i></button>
            <button className="social-btn facebook w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-moyo-dark text-xl border border-gray-200 hover:bg-blue-600 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></button>
            <button className="social-btn apple w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-moyo-dark text-xl border border-gray-200 hover:bg-black hover:text-white transition-all"><i className="fab fa-apple"></i></button>
          </div>
          <div className="signup-link text-center text-moyo-gray mt-2">
            Não tem uma conta? <a href="/signup" className="text-moyo-primary font-semibold hover:underline">Cadastre-se agora</a>
          </div>
        </div>
      </div>
    </div>
  );
}
