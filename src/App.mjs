import express from 'express';
import Routes from '../Routes/index.mjs'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import '../Strategies/localStrategy.mjs'
const app = express();
const PORT = process.env.PORT || 3000;

export const usernames = [{ username: 'Robb Stark', password: 'The Young Wolf' },
{ username: 'Jon Snow', password: 'The White Wolf' }];

app.use(express.json());
app.use(cookieParser('Starks'));
app.use(session({
    secret: 'Starks',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 5
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(Routes);

app.get('/', (request, resposne) => {
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;
    resposne.cookie('GoT', 'Clans', { maxAge: 60000 * 5, signed: true });
    resposne.status(200).send('A Song of Ice and Fire');
})

// app.post('/api/auth', (request, response) => {
//     const { body: { username, password } } = request;

//     const findUser = usernames.find((user) => user.username === username);

//     if (!findUser || findUser.password !== password) return response.status(401).send({ msg: 'Bad Credentials' });

//     request.session.user = findUser;
//     return response.status(200).send(findUser);
// })

// app.get('/api/auth/status', (request, response) => {
//     request.sessionStore.get(request.sessionID, (err, session) => {
//         console.log(session);
//     })
//     return request.session.user ? response.status(200).send(request.session.user) : response.send(401).send({ msg: 'Not Authenticated' });

// })

app.post('/api/cart', (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

    const { body: item } = request;
    const { cart } = request.session;

    if (cart)
        cart.push(item);
    else
        request.session.cart = [item];
    return response.status(200).send(item);
})

app.get('/api/cart', (request, response) => {
    if (!request.session.user) return response.sendStatus(401);

    return response.send(request.session.cart ?? []);
})

app.post('/api/auth', passport.authenticate('local'), (request, response) => {
    response.send(200);
})

app.get('/api/auth/status', (request, response) => {
    console.log(request.user);
    console.log(request.session);
    if (request.user) return response.send(request.user);
    return request.user ? response.send(request.user) : response.sendStatus(401);
})

app.post('/api/auth/logout', (request, response) => {
    if (!request.user) return response.sendStatus(401);
    request.logout((err) => {
        if (err) return response.sendStatus(400);
        return response.sendStatus(200);
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}\nhttp://localhost:${PORT}`);
})