import { Router } from "express";
const endpoints = Router();


endpoints.get('/calculadora/somar/:n1/:n2', (req, resp) => {

    if (isNaN(req.params.n1) || isNaN(req.params.n2)) {
        resp.status(400).send({
            erro: 'Os parâmetros devem ser números.'
        })
        return;
    }

    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);

    let soma = n1 + n2;

    resp.send({
        entrada: {
            numero1: n1,
            numero2: n2,
        },
        soma: soma
    });

});

endpoints.get('/calculadora/somarv2', (req, resp) => {
    let n1 = Number(req.query.num1);
    let n2 = Number(req.query.num2);

    let soma = n1 + n2;

    resp.send({
        soma: soma,
    });
});

export default endpoints;