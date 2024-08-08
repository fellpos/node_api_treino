import { Router } from "express";
const endpoints = Router();

import multer from 'multer';


let uploadPerfil = multer({ dest: './storage/perfil' });



endpoints.post('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {
	let caminho = req.file.path;
	let extensao = req.file.mimetype;
	let nome = req.file.originalname;

	resp.send({
		caminho: caminho,
		extensao: extensao,
		nome: nome
	})
})

export default endpoints;
