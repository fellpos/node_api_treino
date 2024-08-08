import { Router } from "express";
const endpoints = Router();



endpoints.post('/loja/pedido', (req, resp) => {

    try {

        if (!total || isNaN(req.body.total)) throw new Error("O parâmetro total está inválido.");
        if (!parcelas || isNaN(req.query.parcelas)) throw new Error("O parâmetro parcelas está inválido.");


        let total = Number(req.body.total);
        let parcelas = Number(req.query.parcelas);
        let cupom = req.query.cupom ?? 'Não definido';


        let valorParcela = 0;

        if (parcelas > 1) {
            let juros = total * 0.05;
            total += juros;
            valorParcela = total / parcelas;
        }


        if (cupom == "QUERO100") {
            total -= 100;
        }

        resp.send({
            total: total,
            quantParcelas: parcelas,
            valorPorParcela: valorParcela,
            cupom: cupom
        });
    } 
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.post('/loja/pedido/completo', (req, resp) => {

    try {

        if (!req.body.parcelas || isNaN(req.body.parcelas)) throw new Error('O parâmetro parcela está inválido.') //força um erro

        if (!req.body.itens) throw new Error('O parâmetro itens está inválido.') //força um erro


        let parcelas = Number(req.body.parcelas);
        let itens = req.body.itens;
        let cupom = req.query.cupom ?? 'Não possui';

        let total = 0;
        let valorParcela = 0;

        for (let produto of itens) {
            total += produto.preco;
        }

        if (parcelas > 1) {
            let juros = total * 0.05;
            total += juros;
            valorParcela = total / parcelas;
        }

        if (cupom == "QUERO100") {
            total -= 100;
        }

        resp.send({
            total: total,
            parcelas: parcelas,
            valorPorParcela: valorParcela,
            cupom: cupom
        });

    }
    catch (err) {
        resp.status(400).send({
            erro: err.message //texto que tá dentro do Error()
        })
    }

});

export default endpoints;