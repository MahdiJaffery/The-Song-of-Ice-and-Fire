import express from 'express';
import routes from './Routes/index.mjs'
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.get('/', (request, response) => {
    response.cookie('hello', 'world', { maxAge: 60000 });
    response.send('A Song of Ice and Fire');
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}\nhttp://localhost:${PORT}`);
})