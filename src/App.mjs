import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import houseRouter from '../Routes/Houses.mjs'
import sigilRouter from '../Routes/Sigils.mjs'
import cartRouter from '../Routes/Cart.mjs'
import { validationCheck } from '../Utils/Middlewares.mjs';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'Starks',
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 10
    }
}));
app.use(houseRouter);
app.use(sigilRouter);
app.use(cartRouter);

const Users = [{ id: 1, Username: 'Robb Stark', Password: 'The Young Wolf' }];

app.get('/', (request, response) => {
    response.send('A Song of Ice and Fire');
})

app.post('/api/auth', (request, response) => {
    const { body: { Username, Password } } = request;

    const findUser = Users.find((User) => User.Username === Username);

    if (!findUser || findUser.Password !== Password) return response.status(401).send('Bad Credentials');

    request.session.user = findUser;
    response.cookie('GoT', 'Clans', { maxAge: 60000 * 10 });
    return response.status(200).send(findUser);
})

app.get('/api/auth/status', (request, response) => {
    request.sessionStore.get(request.sessionID, (err, session) => {
        console.log(session);
    })
    return request.session.user ? response.send(request.session.user) : response.sendStatus(401);
})

app.post('/api/logout', validationCheck, (request, response) => {
    const { body: { Username, Password } } = request;
    
    request.session.user = undefined;
    return response.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}\nhttp://localhost:${PORT}`);
})