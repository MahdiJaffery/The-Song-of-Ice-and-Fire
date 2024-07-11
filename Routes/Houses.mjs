import { Router } from 'express';
import { query } from 'express-validator'
import mockHouses from '../Utilities/Houses.mjs';
import { resolveHouseByIndex } from '../Utilities/Middlewares.mjs';
const router = Router();

router.get('/api/houses', query('filter').optional().isLength({ min: 3, max: 32 }).withMessage('Must be 3 - 32 Character long'),
    query('value').optional().isLength({ min: 3, max: 32 }).withMessage('Must be 3 - 32 Character long'),
    (request, response) => {
        const { query: { filter, value } } = request;   //  http://localhost:${PORT}/api/houses?filter=filter-value&value=value-value

        if (!value) return response.status(200).send(mockHouses);
        if (filter && value) return response.status(200).send(mockHouses.filter((house) => house[filter].includes(value)));
        return response.sendStatus(400);
    })

router.get('/api/houses/:id', resolveHouseByIndex, (request, response) => {
    const { findHouseIndex } = request;

    response.status(200).send(mockHouses[findHouseIndex]);
})

router.post('/api/houses', (request, response) => {
    const { body } = request;
    const newHouse = { id: mockHouses.length + 1, ...body };

    mockHouses.push(newHouse);
    return response.sendStatus(200);
})

router.put('/api/houses/:id', resolveHouseByIndex, (request, response) => {
    const { body, findHouseIndex } = request;

    mockHouses[findHouseIndex] = { id: mockHouses[findHouseIndex].id, ...body };
    return response.sendStatus(200);
})

router.patch('/api/houses/:id', resolveHouseByIndex, (request, response) => {
    const { body, findHouseIndex } = request;

    mockHouses[findHouseIndex] = { ...mockHouses[findHouseIndex], ...body };
    return response.sendStatus(200);
})

router.delete('/api/houses/:id', resolveHouseByIndex, (request, response) => {
    const { findHouseIndex } = request;

    mockHouses.splice(findHouseIndex, 1);
    return response.sendStatus(200);
})

export default router;