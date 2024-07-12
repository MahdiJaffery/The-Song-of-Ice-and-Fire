import express from 'express';
import Routes from '../Routes/index.mjs'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(Routes);

app.get('/', (request, resposne) => {
    resposne.status(200).send('A Song of Ice and Fire');
})

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}\nhttp://localhost:${PORT}`);
})