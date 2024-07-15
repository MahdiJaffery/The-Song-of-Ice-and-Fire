import { Router } from "express";
import { resolveHouseByIndex, validationCheck } from "../Utils/Middlewares.mjs";
import { mockHouses } from "../Utils/Utils.mjs";
const router = Router();

router.get('/api/houses', validationCheck, (request, response) => {
    const { query: { filter, value } } = request;

    if (!value) return response.send(mockHouses);
    if (filter && value) return response.send(mockHouses.filter((house) => house[filter].includes(value)));
    return response.sendStatus(400);
})

router.get('/api/houses/:id', validationCheck, resolveHouseByIndex, (request, response) => {
    const { findIndex } = request;

    return response.status(200).send(mockHouses[findIndex]);
})

router.post('/api/houses', (request, response) => {
    const { body } = request;
    const newHouse = { id: mockHouses.length + 1, ...body };

    mockHouses.push(newHouse);
    return response.sendStatus(201);
})

router.put('/api/houses/:id', validationCheck, resolveHouseByIndex, (request, response) => {
    const { body, findIndex } = request;

    mockHouses[findIndex] = { id: mockHouses[findIndex], ...body };
    return response.sendStatus(200);
})

router.patch('/api/houses/:id', validationCheck, resolveHouseByIndex, (request, response) => {
    const { body, findIndex } = request;

    mockHouses[findIndex] = { ...mockHouses[findIndex], ...body };
    return response.sendStatus(200);
})

router.delete('/api/houses/:id', validationCheck, resolveHouseByIndex, (request, response) => {
    const { findIndex } = request;

    mockHouses.splice(findIndex, 1);
    return response.sendStatus(200);
})

export default router;