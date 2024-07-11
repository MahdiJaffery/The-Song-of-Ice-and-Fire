import express from 'express';
import houseRouter from './Routes/Houses.mjs'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(houseRouter);


app.get('/', (request, response) => {
    response.cookie('A Cookie for a Pookie', 'Cookie', { maxAge: 60000 });
    response.send('A Song of Ice and Fire');
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}\nhttp://localhost:${PORT}`);
})