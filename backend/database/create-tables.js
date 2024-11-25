import { sql } from '../config/db.js';

// Criação da tabela EntradaSaida
sql`
CREATE TABLE EntradaSaida (
  idEntradaSaida UUID PRIMARY KEY,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(255),
  tipo VARCHAR(10) CHECK (tipo IN ('entrada', 'saida'))
)
`.then(() => {
  console.log('Tabela EntradaSaida criada');
}).catch(err => {
  console.error('Erro ao criar tabela EntradaSaida:', err);
});

// Criação da tabela Funcionarios
sql`
CREATE TABLE Funcionarios (
  matricula UUID PRIMARY KEY,
  name VARCHAR(255),
  senha VARCHAR(255)
)
`.then(() => {
  console.log('Tabela Funcionarios criada');
}).catch(err => {
  console.error('Erro ao criar tabela Funcionarios:', err);
});