import { Router } from "express";
const endpoints = Router();



endpoints.post('/media', (req, resp) => {
    let n1 = req.body.nota1;
    let n2 = req.body.nota2;
    let n3 = req.body.nota3;

    let media = n1 + n2 + n3 / 3;

    resp.send({
        media: media
    });

});

endpoints.post('/dobros', (req, resp) => {
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

export default endpoints;