import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Obter o diretório atual do arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Função para executar o script SQL de inicialização
async function initializeDatabase(pool) {
  const initScript = fs.readFileSync(path.join(__dirname, "../init_db.sql"), "utf-8");
  try {
    await pool.query(initScript);
    console.log("Banco de dados inicializado com sucesso.");
  } catch (err) {
    console.error("Erro ao inicializar o banco de dados:", err);
  }
}

// Executar a inicialização do banco de dados
initializeDatabase(pool);

app.get("/", (req, res) => {
  res.send("API Moyo rodando!");
});

// Listar pacientes
app.get("/pacientes", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT id, nome, email, data_nascimento, sexo, telefone FROM pacientes");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar pacientes:", err);
    res.status(500).json({ error: "Erro ao buscar pacientes" });
  }
});

// Cadastro de paciente
app.post("/pacientes", async (req, res) => {
  const { nome, email, senha, data_nascimento, sexo, telefone, endereco } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ error: "Campos obrigatórios" });
  try {
    const hash = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      `INSERT INTO pacientes (nome, email, senha_hash, data_nascimento, sexo, telefone, endereco) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, nome, email`,
      [nome, email, hash, data_nascimento, sexo, telefone, endereco]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar paciente" });
  }
});

// Login de paciente
app.post("/login", async (req, res) => {
  const { email, senha, perfil } = req.body;
  if (!email || !senha || !perfil) return res.status(400).json({ error: "Campos obrigatórios" });
  try {
    let user;
    if (perfil === "paciente") {
      const result = await pool.query("SELECT * FROM pacientes WHERE email = $1", [email]);
      if (result.rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });
      user = result.rows[0];
    } else if (perfil === "profissional") {
      const result = await pool.query("SELECT * FROM profissionais WHERE email = $1", [email]);
      if (result.rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });
      user = result.rows[0];
    } else {
      return res.status(400).json({ error: "Perfil inválido" });
    }
    const match = await bcrypt.compare(senha, user.senha_hash);
    if (!match) return res.status(401).json({ error: "Senha incorreta" });
    res.json({ id: user.id, nome: user.nome, email: user.email, perfil });
  } catch (err) {
    res.status(500).json({ error: "Erro ao autenticar", detalhes: err.message });
  }
});

// Listar consultas
app.get("/consultas", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM consultas");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar consultas" });
  }
});

// Agendar consulta
app.post("/consultas", async (req, res) => {
  const { paciente_id, data_consulta, descricao } = req.body;
  if (!paciente_id || !data_consulta) return res.status(400).json({ error: "Campos obrigatórios" });
  try {
    const result = await pool.query(
      `INSERT INTO consultas (paciente_id, data_consulta, descricao) VALUES ($1, $2, $3) RETURNING *`,
      [paciente_id, data_consulta, descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao agendar consulta" });
  }
});

// Listar exames
app.get("/exames", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM exames");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar exames" });
  }
});

// Solicitar exame
app.post("/exames", async (req, res) => {
  const { paciente_id, tipo, data } = req.body;
  if (!paciente_id || !tipo || !data) return res.status(400).json({ error: "Campos obrigatórios" });
  try {
    const result = await pool.query(
      `INSERT INTO exames (paciente_id, tipo, data) VALUES ($1,$2,$3) RETURNING *`,
      [paciente_id, tipo, data]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao solicitar exame" });
  }
});

// Cadastro de profissional
app.post("/profissionais", async (req, res) => {
  const { nome, email, senha, data_nascimento, sexo, telefone, endereco, bi, unidade, municipio, area, cargo } = req.body;
  if (!nome || !email || !senha || !data_nascimento || !sexo || !telefone || !endereco || !bi || !unidade || !municipio || !area || !cargo) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios do profissional." });
  }
  try {
    const hash = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      `INSERT INTO profissionais (nome, email, senha_hash, data_nascimento, sexo, telefone, endereco, bi, unidade, municipio, area, cargo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id, nome, email, unidade, municipio, area, cargo`,
      [nome, email, hash, data_nascimento, sexo, telefone, endereco, bi, unidade, municipio, area, cargo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar profissional", detalhes: err.message });
  }
});

// Login de profissional
// (Removido: login-profissional, agora o login é único e verifica perfil)

// Rota temporária para listar tabelas existentes
app.get("/debug/tabelas", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar tabelas", detalhes: err.message });
  }
});

console.log("Variáveis de ambiente:", {
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGHOST: process.env.PGHOST,
  PGPORT: process.env.PGPORT,
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
