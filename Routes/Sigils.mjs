import { Router } from "express";
import { mockSigils } from "../Utils/Utils.mjs";
import { resolveSigilByIndex } from "../Utils/Middlewares.mjs";
const router = Router();

router.get('/api/Sigils', (request, response) => {
    const { query: { filter, value } } = request;

    if (!value) return response.send(mockSigils);
    if (filter && value) return response.send(mockSigils.filter((Sigil) => hosue[filter].includes(value)));
    return response.sendStatus(400);
})

router.get('/api/Sigils/:id', resolveSigilByIndex, (request, response) => {
    const { SigilIndex } = request;

    return response.status(200).send(mockSigils[SigilIndex]);
})

router.post('/api/Sigils', (request, response) => {
    console.log(request.body);
    const { body } = request;
    const newSigil = { id: mockSigils.length + 1, ...body };

    mockSigils.push(newSigil);
    return response.sendStatus(200);
})

router.put('/api/Sigils/:id', resolveSigilByIndex, (request, response) => {
    const { body, SigilIndex } = request;

    mockSigils[SigilIndex] = { id: mockSigils[SigilIndex].id, ...body };
    return response.sendStatus(200);
})

router.patch('/api/Sigils/:id', resolveSigilByIndex, (request, response) => {
    const { body, SigilIndex } = request;

    mockSigils[SigilIndex] = { ...mockSigils[SigilIndex], ...body };
    return response.sendStatus(200);
})

router.delete('/api/Sigils/:id', resolveSigilByIndex, (request, response) => {
    const { SigilIndex } = request;

    mockSigils.splice(SigilIndex, 1);
    return response.sendStatus(200);
})

export default router;