import { Router } from "express";
import { mockSigils } from "../Utils/Utils.mjs";
import { resolveSigilByIndex, validationCheck } from "../Utils/Middlewares.mjs";
const router = Router();

router.get('/api/sigils', validationCheck, (request, response) => {
    const { query: { filter, value } } = request;

    if (!value) return response.send(mockSigils);
    if (filter && value) return response.send(mockSigils.filter((sigil) => sigil[filter].includes(value)));
    return response.sendStatus(400);
})

router.get('/api/sigils/:id', validationCheck, resolveSigilByIndex, (request, response) => {
    const { findIndex } = request;

    return response.send(mockSigils[findIndex]);
})

router.post('/api/sigils', (request, response) => {
    const { body } = request;
    const newSigil = { id: mockSigils.length + 1, ...body };

    mockSigils.push(newSigil);
    return response.sendStatus(201);
})

router.put('/api/sigils/:id', resolveSigilByIndex, (request, response) => {
    const { body, findIndex } = request;

    mockSigils[findIndex] = { id: mockSigils[findIndex].id, ...body };
    return response.status(200).send(mockSigils[findIndex]);
})

router.patch('/api/sigils/:id', resolveSigilByIndex, (request, response) => {
    const { body, findIndex } = request;

    mockSigils[findIndex] = { ...mockSigils[findIndex], ...body };
    return response.status(200).send(mockSigils[findIndex]);
})

router.delete('/api/sigils/:id', resolveSigilByIndex, (request, response) => {
    const { findIndex } = request;

    mockSigils.splice(findIndex, 1);
    return response.sendStatus(200);
})

export default router;