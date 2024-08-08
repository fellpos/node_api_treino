import express from 'express';
import cors from 'cors';
import multer from 'multer';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

let uploadPerfil = multer({ dest: './storage/perfil' });

servidor.use('/storage/perfil', express.static('./storage/perfil'))

servidor.get('/helloworld', (req, resp) => {
    resp.send('hello world');
});

servidor.get('/calculadora/somar/:n1/:n2', (req, resp) => {

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

servidor.get('/calculadora/somarv2', (req, resp) => {
    let n1 = Number(req.query.num1);
    let n2 = Number(req.query.num2);

    let soma = n1 + n2;

    resp.send({
        soma: soma,
    });
});

servidor.post('/media', (req, resp) => {
    let n1 = req.body.nota1;
    let n2 = req.body.nota2;
    let n3 = req.body.nota3;

    let media = n1 + n2 + n3 / 3;

    resp.send({
        media: media
    });

});

servidor.post('/dobros', (req, resp) => {
    let nums = req.body.numeros

    let nums2 = []

    for (let i = 0; i < nums.length; i++) {
        nums2[i] = nums[i] * 2;
    }

    resp.send({
        "numeros": nums,
        "Dobro": nums2
    });
});

servidor.post('/loja/pedido', (req, resp) => {

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

servidor.post('/loja/pedido/completo', (req, resp) => {

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

servidor.post('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {
	let caminho = req.file.path;
	let extensao = req.file.mimetype;
	let nome = req.file.originalname;

	resp.send({
		caminho: caminho,
		extensao: extensao,
		nome: nome
	})
})

servidor.listen(
    5001,
    () => console.log('Api subiu na porta 5001')
);