import { Router } from "express";
import { mockHouses } from "../Utils/Utils.mjs";
import { resolveHouseByIndex } from "../Utils/Middlewares.mjs";
const router = Router();

const checkCookies = (request, response, next) => {
    if (request.cookies.GoT)
        next();
    else
        return response.status(400).send('Missing Cookie(s)');
}

router.get('/api/Houses', checkCookies, (request, response) => {
    const { query: { filter, value } } = request;

    if (!value) return response.send(mockHouses);
    if (filter && value) return response.send(mockHouses.filter((House) => House[filter].includes(value)));
    return response.sendStatus(400);
})

router.get('/api/Houses/:id', checkCookies, resolveHouseByIndex, (request, response) => {
    const { houseIndex } = request;

    return response.status(200).send(mockHouses[houseIndex]);
})

router.post('/api/Houses', checkCookies, (request, response) => {
    console.log(request.body);
    const { body } = request;
    const newHouse = { id: mockHouses.length + 1, ...body };

    mockHouses.push(newHouse);
    return response.sendStatus(200);
})

router.put('/api/Houses/:id', checkCookies, resolveHouseByIndex, (request, response) => {
    const { body, houseIndex } = request;

    mockHouses[houseIndex] = { id: mockHouses[houseIndex].id, ...body };
    return response.sendStatus(200);
})

router.patch('/api/Houses/:id', checkCookies, resolveHouseByIndex, (request, response) => {
    const { body, houseIndex } = request;

    mockHouses[houseIndex] = { ...mockHouses[houseIndex], ...body };
    return response.sendStatus(200);
})

router.delete('/api/Houses/:id', checkCookies, resolveHouseByIndex, (request, response) => {
    const { houseIndex } = request;

    mockHouses.splice(houseIndex, 1);
    return response.sendStatus(200);
})

export default router;