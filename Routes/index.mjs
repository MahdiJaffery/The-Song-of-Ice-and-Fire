import { Router } from 'express';
const router = Router();
import houseRouter from './Houses.mjs'
import { mockHouses } from '../Utilities/Houses.mjs';
import { resolveHouseByIndex } from '../Utilities/Middlewares.mjs';

router.use(houseRouter);


export default router;