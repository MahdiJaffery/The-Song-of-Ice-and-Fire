import express from 'express';
import Routes from '../Routes/index.mjs'
import cookieParser from 'cookie-parser';
import session from 'express-session';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(session());
app.use(Routes);

app.get('/', (request, resposne) => {
    resposne.cookie('GoT', 'Clans', { maxAge: 60000 * 5 });
    resposne.status(200).send('A Song of Ice and Fire');
})

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}\nhttp://localhost:${PORT}`);
})