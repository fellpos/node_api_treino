import { Router } from "express";
const endpoints = Router();

endpoints.get('/helloworld', (req, resp) => {
    resp.send('hello world');
});

export default endpoints;