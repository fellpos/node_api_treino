import { calcularTotal, calcularValorParcela } from "../service/loja/pedidoCompletoService.js";
import { validarPedidoCompleto } from "../validation/loja/pedidoCompletoValidation.js";


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
        validarPedidoCompleto(req);

        let parcelas = Number(req.body.parcelas);
        let itens = req.body.itens;
        let cupom = req.query.cupom ?? 'Não possui';

        let total = calcularTotal(parcelas, itens, cupom);
        let valorParcela = calcularValorParcela(total, parcelas)

        resp.send({
            total: total,
            parcelas: parcelas,
            valorPorParcela: valorParcela,
            cupom: cupom
        });

    }
    catch (err) {
        logError(err);
        resp.status(400).send(criarErro(err))
    }

});

export default endpoints;