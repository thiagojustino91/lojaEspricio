const express = require("express");
const router =express.Router();
const {produtoController}= require("../controllers/produtoController");

// GET /produtos -> Listar todos os produtos.
router.get('/produtos', produtoController.listarProdutos);

// POST /produtos -> Cria um novo produto
router.post('/produtos', produtoController.criarProduto);
 
// PUT / Atualizar Produtos
router.put('/produtos/:idProduto', produtoController.atualizarProduto);



module.exports={produtoRoutes: router};