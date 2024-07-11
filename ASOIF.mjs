import express from 'express';
import { query, validationResult } from 'express-validator';
import mockHouses from './Utilities/Houses.mjs';
import resolveHouseByIndex from './Utilities/Middlewares.mjs';
import houseRouter from './Routes/Houses.mjs'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(houseRouter);


app.get('/', (request, response) => {
    response.send('A Song of Ice and Fire');
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}\nhttp://localhost:${PORT}`);
})