import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';

import adcionarRotas from './rotas.js';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());


// adciona as rotas
adcionarRotas(servidor)



const PORTA = process.env.PORTA

servidor.listen(
    PORTA,
    ( ) => console.log(`------> API subiu na porta ${PORTA}!! `));