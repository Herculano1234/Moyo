
-- Script de inicialização do banco de dados PostgreSQL para o projeto Moyo

-- Criar tabela de pacientes
CREATE TABLE IF NOT EXISTS pacientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_nascimento DATE  NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco TEXT NOT NULL,
    bi VARCHAR(50),
    foto_perfil TEXT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de profissionais
CREATE TABLE IF NOT EXISTS profissionais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE  NOT NULL,
    bi VARCHAR(50) NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    morada TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    unidade VARCHAR(100) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    registro_profissional VARCHAR(50) NOT NULL,
    foto_perfil TEXT NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de consultas
CREATE TABLE IF NOT EXISTS consultas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id) ON DELETE CASCADE,
    profissional_id INT REFERENCES profissionais(id) ON DELETE CASCADE,
    data_hora TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'agendada',
    prioridade VARCHAR(10),
    local VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
