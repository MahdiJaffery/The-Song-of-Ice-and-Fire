import express from 'express';
import { query, validationResult } from 'express-validator';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}\nhttp://localhost:${PORT}`);
})