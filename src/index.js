import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';

// importa as funcoes globais
import './utils/global.js';

import adcionarRotas from './rotas.js';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

// http://localhost:5001/helloworld
// adciona as rotas
adcionarRotas(servidor)



const PORTA = process.env.PORTA

servidor.listen(
    PORTA,
    ( ) => console.log(`------> API subiu na porta ${PORTA}!! `));