//Importar a conexão com o bancos de dados  e tipos de dasos SQL
const {sql, getConnection}= require("../config/db");

const produtoModel={
    /**
     * Modelo que busca todos os produtos no banco de dados
     * 
     * @async 
     * @function buscarTodos
     * @returns  {Promise<Array>} Retorna uma lista com todos os Produtos
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     */


    buscarTodos:async ()=>{
        try {
            const pool=await getConnection();

            let querySQL ="SELECT * FROM Produtos";

            const result =await pool.request().query(querySQL);
            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw error;
        }

    },

    buscarUm: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = 'SELECT * FROM produtos WHERE idProduto = @idProduto';

            const result = await pool.request()
             .input('idProduto', sql.UniqueIdentifier, idProduto)
             .query(querySQL);

             return result.recordset;
        

        } catch (error) {
            console.error('Erro ao buscar o produto:', error);
            throw error; // throw reverbera o erro
        }
    },

    inserirProduto: async (nomeProduto, precoProduto)=>{
        try {
            
            const pool = await getConnection();

            let querySQL = 'INSERT INTO Produtos (nomeProduto, precoProduto) VALUES (@nomeProduto, @precoProduto)';

            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10,2), precoProduto)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao inserir produto:', error);
            throw error;
            
        }
    },

    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            // EVITAR SQL INJECTION
            const querySQL = `
                UPDATE Produtos
                SET nomeProduto = @nomeProduto,
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto
            `
            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao atualizar Produto:', error);
            throw error;
        }
    },

    deletarProduto: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                DELETE FROM Produtos 
                WHERE idProduto = @idProduto
            `
            await pool.request()
                .input("idProduto", sql.UniqueIdentifier, idProduto)
                .query(querySQL)




        } catch (error) {
            console.error('Erro ao deletar Produto:', error);
            throw error;
            
        }
    }



    
};


module.exports = {produtoModel};