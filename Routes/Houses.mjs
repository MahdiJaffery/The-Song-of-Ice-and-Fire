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

router.get('/api/Houses/:id', resolveHouseByIndex, (request, response) => {
    const { HouseIndex } = request;

    return response.status(200).send(mockHouses[HouseIndex]);
})

router.post('/api/Houses', (request, response) => {
    console.log(request.body);
    const { body } = request;
    const newHouse = { id: mockHouses.length + 1, ...body };

    mockHouses.push(newHouse);
    return response.sendStatus(200);
})

router.put('/api/Houses/:id', resolveHouseByIndex, (request, response) => {
    const { body, HouseIndex } = request;

    mockHouses[HouseIndex] = { id: mockHouses[HouseIndex].id, ...body };
    return response.sendStatus(200);
})

router.patch('/api/Houses/:id', resolveHouseByIndex, (request, response) => {
    const { body, HouseIndex } = request;

    mockHouses[HouseIndex] = { ...mockHouses[HouseIndex], ...body };
    return response.sendStatus(200);
})

router.delete('/api/Houses/:id', resolveHouseByIndex, (request, response) => {
    const { HouseIndex } = request;

    mockHouses.splice(HouseIndex, 1);
    return response.sendStatus(200);
})

export default router;