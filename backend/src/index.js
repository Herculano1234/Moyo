
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const pool = new Pool();

// Obter o diretório atual do arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Listar consultas de um paciente específico
app.get("/pacientes/:id/consultas", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT id, paciente_id, profissional_id, data_hora, status, prioridade, local, created_at
       FROM consultas WHERE paciente_id = $1 ORDER BY data_hora DESC`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar consultas do paciente:", err);
    res.status(500).json({ error: "Erro ao buscar consultas do paciente", detalhes: err.message });
  }
});

// Cadastrar consulta para um paciente específico
app.post("/pacientes/:id/consultas", async (req, res) => {
  const { id } = req.params;
  const {
    data_hora,
    status = 'agendada',
    prioridade = null,
    local = null
  } = req.body;
  if (!data_hora) return res.status(400).json({ error: "Campo data_hora é obrigatório" });
  try {
    // profissional_id começa como null ("A ser definido" será tratado na aplicação)
    const result = await pool.query(
      `INSERT INTO consultas (paciente_id, profissional_id, data_hora, status, prioridade, local)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id, null, data_hora, status, prioridade, local]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao agendar consulta:", err);
    res.status(500).json({ error: "Erro ao agendar consulta", detalhes: err.message });
  }
});
app.get("/", (req, res) => {
  res.send("API Moyo rodando!");
});

// Listar pacientes
app.get("/pacientes", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT id, nome, email, data_nascimento, sexo, telefone, endereco, bi, foto_perfil FROM pacientes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pacientes" });
  }
});

// Atualizar dados do paciente
app.put("/pacientes/:id", async (req, res) => {
  const { id } = req.params;
  const { email, telefone, endereco, foto_perfil } = req.body;
  try {
    // Atualiza apenas os campos permitidos
    const result = await pool.query(
      `UPDATE pacientes SET email = $1, telefone = $2, endereco = $3, foto_perfil = $4 WHERE id = $5 RETURNING id, nome, email, telefone, endereco, foto_perfil`,
      [email, telefone, endereco, foto_perfil, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Paciente não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar paciente" });
  }
});
// Cadastro de paciente
app.post("/pacientes", async (req, res) => {
  const { nome, email, senha, data_nascimento, sexo, telefone, endereco, bi, foto_perfil } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ error: "Campos obrigatórios" });
  try {
    const hash = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      `INSERT INTO pacientes (nome, email, senha_hash, data_nascimento, sexo, telefone, endereco, bi, foto_perfil) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, nome, email, foto_perfil`,
      [nome, email, hash, data_nascimento, sexo, telefone, endereco, bi, foto_perfil]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar paciente ; {err}" + err });
  }
});

// Login de paciente
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: "Campos obrigatórios" });
  try {
    const result = await pool.query("SELECT * FROM pacientes WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });
    const paciente = result.rows[0];
    const match = await bcrypt.compare(senha, paciente.senha_hash);
    if (!match) return res.status(401).json({ error: "Senha incorreta" });
    res.json({ id: paciente.id, nome: paciente.nome, email: paciente.email, foto_perfil: paciente.foto_perfil });
  } catch (err) {
    res.status(500).json({ error: "Erro ao autenticar" });
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
// Listar profissionais
app.get("/profissionais", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT nome, data_nascimento, bi, sexo, morada, email, telefone, unidade, municipio, especialidade, cargo, registro_profissional FROM profissionais");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar profissionais" });
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
  const {
    nome,
    data_nascimento,
    bi,
    sexo,
    morada,
    email,
    telefone,
    unidade,
    municipio,
    especialidade,
    cargo,
    registro_profissional,
    senha,
    foto_perfil
  } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ error: "Campos obrigatórios" });
  try {
    const hash = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      `INSERT INTO profissionais (
        nome, data_nascimento, bi, sexo, morada, email, telefone, unidade, municipio, especialidade, cargo, registro_profissional, foto_perfil, senha_hash
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
      ) RETURNING id, nome, email, especialidade, foto_perfil`,
      [
        nome,
        data_nascimento,
        bi,
        sexo,
        morada,
        email,
        telefone,
        unidade,
        municipio,
        especialidade,
        cargo,
        registro_profissional,
        foto_perfil,
        hash
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao cadastrar profissional:", err);
    res.status(500).json({ error: "Erro ao cadastrar profissional", detalhes: err.message });
  }
});

// Login de profissional
app.post("/login-profissional", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: "Campos obrigatórios" });
  try {
    const result = await pool.query("SELECT * FROM profissionais WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });
    const prof = result.rows[0];
    const match = await bcrypt.compare(senha, prof.senha_hash);
    if (!match) return res.status(401).json({ error: "Senha incorreta" });
    res.json({ id: prof.id, nome: prof.nome, email: prof.email, especialidade: prof.especialidade, foto_perfil: prof.foto_perfil });
  } catch (err) {
    res.status(500).json({ error: "Erro ao autenticar profissional" });
  }
});

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
