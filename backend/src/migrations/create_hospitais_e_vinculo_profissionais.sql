-- Criação da tabela hospitais
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
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Atualização da tabela profissionais para vincular ao hospital
ALTER TABLE profissionais
ADD COLUMN hospital_id INTEGER REFERENCES hospitais(id);
