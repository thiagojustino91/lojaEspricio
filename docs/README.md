## 🔌 API Reference

### Produtos

#### GET /produtos
- **Descrição**: Obtém uma lista de produtos
- **Response**: Array de produtos


#### POST /produtos
- **Descrição**: Cria um novo produto
- **Body**:
```
{
    "nomeProduto": "produtoExemplo",
    "precoProduto": 0.00
}
```

- **Response**:
```
{
    "message": "Produto cadastrado com sucesso!"
}
```

- **Error Response**:
```
{
    "erro": "Campos obrigatorios não preenchidos!"
}
```

---------------------------------------------------

### Clientes

#### GET /clientes
- **Descrição**: Obtém uma lista de Clientes
- **Response**: Array de clientes

#### POST /clientes
- **Descrição**: Cria um novo cliente

- **Body**:
```
{
    "nomeCliente": "nomeExemplo",
    "cpfCliente": "000.000.000-00"
    
}