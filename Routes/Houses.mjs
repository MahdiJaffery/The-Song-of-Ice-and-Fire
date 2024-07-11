import { Router } from 'express';
import mockHouses from '../Utilities/Houses.mjs';
import resolveHouseByIndex from '../Utilities/Middlewares.mjs';
const router = Router();

router.get('/api/houses', (request, response) => {
    const { query: { filter, value } } = request;

    
    response.send(mockHouses);
})