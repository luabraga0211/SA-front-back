import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { DatabasePostgres } from './database/database-postgres.js';

const server = fastify();
const databasePostgres = new DatabasePostgres();

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// ENDPOINTS (CRUD) DE FUNCIONARIOS:

// CREATE
server.post('/funcionarios', async (request, reply) => {
    try {
        const body = request.body;
        await databasePostgres.createFuncionarios(body);
        return reply.status(201).send({ message: 'Funcionário criado com sucesso!' });
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao criar funcionário', details: error.message });
    }
});

// READ
server.get('/funcionarios', async () => {
    try {
        const funcionarios = await databasePostgres.listFuncionarios();
        return funcionarios;
    } catch (error) {
        return { error: 'Erro ao listar funcionários', details: error.message };
    }
});

// UPDATE
server.put('/funcionarios/:matricula', async (request, reply) => {
    try {
        const funcionariosID = request.params.matricula;
        const body = request.body;
        await databasePostgres.updateFuncionarios(funcionariosID, body);
        return reply.status(204).send();
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao atualizar funcionário', details: error.message });
    }
});

// DELETE
server.delete('/funcionarios/:matricula', async (request, reply) => {
    try {
        const funcionariosID = request.params.matricula;
        await databasePostgres.deleteFuncionarios(funcionariosID);
        return reply.status(204).send();
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao deletar funcionário', details: error.message });
    }
});

// endpoints (CRUD) DE ENTRADA E SAIDA

// CREATE
server.post('/entradasaida', async (request, reply) => {
    try {
        const body = request.body;
        await databasePostgres.createEntradaSaida(body);
        return reply.status(201).send({ message: 'Registro de entrada/saída criado com sucesso!' });
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao criar registro de entrada/saída', details: error.message });
    }
});

// READ
server.get('/entradasaida', async () => {
    try {
        const entradaSaida = await databasePostgres.listEntradaSaida();
        return entradaSaida;
    } catch (error) {
        return { error: 'Erro ao listar registros de entrada/saída', details: error.message };
    }
});

// UPDATE
server.put('/entradasaida/:idEntradaSaida', async (request, reply) => {
    try {
        const entradaSaidaID = request.params.idEntradaSaida;
        const body = request.body;
        await databasePostgres.updateEntradaSaida(entradaSaidaID, body);
        return reply.status(204).send();
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao atualizar registro de entrada/saída', details: error.message });
    }
});

// DELETE
server.delete('/entradasaida/:idEntradaSaida', async (request, reply) => {
    try {
        const entradaSaidaID = request.params.idEntradaSaida;
        await databasePostgres.deleteEntradaSaida(entradaSaidaID);
        return reply.status(204).send();
    } catch (error) {
        return reply.status(500).send({ error: 'Erro ao deletar registro de entrada/saída', details: error.message });
    }
});

server.listen({
    port: 3333
});