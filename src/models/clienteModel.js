//Importar a conexão com o bancos de dados  e tipos de dasos SQL
const {sql, getConnection}= require("../config/db");

/**
 * @namespace clienteModel
 * @description Módulo de Acesso a Dados (Model) responsável por todas as operações de CRUD 
 * na tabela 'Clientes'.
 * * Nota: Assume o uso do pacote 'mssql' para conexão com o banco de dados.
 */

/**
     * @function buscarTodos
     * @description Busca e retorna todos os registros de clientes da tabela 'Clientes'.
     * @async
     * @returns {Promise<Array<Object>>} Uma Promise que resolve para um array de objetos de clientes (recordset).
     * @throws {Error} Lança um erro se a conexão com o banco ou a consulta SQL falhar.
     */


const clienteModel={
    buscarTodos:async ()=>{
        try {
            const pool=await getConnection();

            let querySQL ="SELECT * FROM Clientes";

            const result =await pool.request().query(querySQL);
            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            throw error;
        }

    },

    
    buscarPorCPF: async (cpfCliente)=>{

        try {
            const pool = await getConnection();

            let querySQL ="SELECT * FROM Clientes WHERE cpfCliente = @cpfCliente";

            const result = await pool.request()
                .input('cpfCliente', sql.VarChar(14), cpfCliente)
                .query(querySQL);
            
            return result.recordset;


        } catch (error) {
            console.error("Erro ao buscar Cliente por CPF:", error);
            throw error;
        }

    },


    buscarPorEmail: async (emailCliente)=>{

        try {
            const pool = await getConnection();

            let querySQL ="SELECT * FROM Clientes WHERE emailCliente = @emailCliente";

            const result = await pool.request()
                .input('emailCliente', sql.VarChar(200), emailCliente)
                .query(querySQL);
            
            return result.recordset;


        } catch (error) {
            console.error("Erro ao buscar Cliente por Email:", error);
            throw error;
        }

    },

    


    inserirCliente: async (nomeCliente, cpfCliente, emailCliente, senhaCliente)=>{
        try {
            
            const pool = await getConnection();

            let querySQL = 'INSERT INTO Clientes (nomeCliente, cpfCliente, emailCliente, senhaCliente) VALUES (@nomeCliente, @cpfCliente, @emailCliente, @senhaCliente)';


            await pool.request()
                .input('nomeCliente', sql.VarChar(250), nomeCliente)
                .input('cpfCliente', sql.VarChar(15), cpfCliente)
                .input('emailCliente', sql.VarChar(200),emailCliente)
                .input('senhaCliente', sql.VarChar(255), senhaCliente)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao inserir cliente:', error);
            throw error;
            
        }
    },

    
};


module.exports = {clienteModel};