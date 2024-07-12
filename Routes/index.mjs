import { Router } from "express";
import houseRoute from './Houses.mjs'
import sigilRoute from './Sigils.mjs'
const router = Router();

router.use(houseRoute);
router.use(sigilRoute);

export default router;