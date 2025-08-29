
-- Script de inicialização do banco de dados PostgreSQL para o projeto Moyo
CREATE TABLE IF NOT EXISTS hospitais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    provincia VARCHAR(100),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    areas_trabalho TEXT, -- Ex: 'Clínica Geral, Pediatria, Ortopedia'
    exames_disponiveis TEXT, -- Ex: 'Raio-X, Hemograma, Ultrassom'
    telefone VARCHAR(50),
    email VARCHAR(100),
    site VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    capacidade INTEGER DEFAULT 0,
    status VARCHAR(30) DEFAULT 'ativo'
);


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
    hospital_id INT REFERENCES hospitais(id),
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
-- Adicionar campos para indicadores na tabela hospitais
ALTER TABLE hospitais
ADD COLUMN IF NOT EXISTS capacidade INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS status VARCHAR(30) DEFAULT 'ativo';