import { Router } from 'express';
import { query } from 'express-validator'
import mockHouses from '../Utilities/Houses.mjs';
import resolveHouseByIndex from '../Utilities/Middlewares.mjs';
const router = Router();

router.get('/api/houses', query('filter').optional().isLength({ min: 3, max: 32 }).withMessage('Must be 3 - 32 Character long'),
    query('value').optional().isLength({ min: 3, max: 32 }).withMessage('Must be 3 - 32 Character long'),
    (request, response) => {
        const { query: { filter, value } } = request;   //  http://localhost:${PORT}/api/houses?filter=filter-value&value=value-value

        if (!value) return response.status(200).send(mockHouses);
        if (filter && value) return response.status(200).send(mockHouses.filter((house) => house[filter].includes(value)));
        return response.sendStatus(400);
    })

export default router;