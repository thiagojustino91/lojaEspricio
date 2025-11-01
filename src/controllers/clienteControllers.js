const {clienteModel} = require("../models/clienteModel");

const bcrypt = require('bcrypt');


    /*
    -----------------------
    LISTAR TODOS CLIENTES
    GET /clientes
    -----------------------
    */

const clienteController ={
    
    listarClientes: async (req, res)=>{
        try {
            const clientes = await clienteModel.buscarTodos();
            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({error: 'Error ao buscar clientes'});
            
        }

    },

    /*
    -----------------------
    CRIAR UM NOVO CLIENTE
    POST /cliente
    BODY:
    {
        "nomeCliente": "nome",
        "cpfCliente": "000.000.000-00"
    }
    -----------------------
    */

    criarCliente: async (req, res)=>{
        try {

           const {nomeCliente, cpfCliente, emailCliente, senhaCliente} = req.body;
           
           if (nomeCliente == undefined || cpfCliente == undefined || emailCliente == undefined || senhaCliente == undefined) {
                return res.status(400).json({erro: 'Campos obrigatorios não preenchidos!'});
           }
           
           const clientes = await clienteModel.buscarPorCPF(cpfCliente);
           
           if (clientes.length > 0 ) {
               return res.status(409).json({erro: 'CPF já cadastrado!'})
            }
            const saltRounds = 10;
 
            const senhaHash = bcrypt.hashSync(senhaCliente, saltRounds)

           await clienteModel.inserirCliente(nomeCliente, cpfCliente, emailCliente, senhaHash);
           res.status(201).json({message: 'Cliente cadastrado com sucesso!'});
            
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({erro: 'Erro ao cadatrar cliente.'});
        }
    }
    
}

module.exports={clienteController};