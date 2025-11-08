const jwt = require("jsonwebtoken");

const verify = {
    cliente: async (req, res, next) => {
        try {
            const {token} = req.cookies;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if(!decoded.tipoUsuario || decoded.tipoUsuario !== "cliente") {
                return res.status(400).json({erro: "Acesso permitido somente para clientes!"});
            }
            
            req.cliente = {
                idCliente: decoded.idCliente,
                nomeCliente: decoded.nomeCliente

            };

            next();

        } catch (error) {
            console.error("Erro ao verificar token", error);
            return res.status(401).json({erro: "Token invalido ou expirado!"});
        }
    }
};

module.exports = {verify}; 