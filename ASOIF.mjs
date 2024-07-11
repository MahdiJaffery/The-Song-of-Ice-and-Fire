import express, { response } from 'express';
import { query, validationResult } from 'express-validator';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const mockHouses = [{ id: 1, House: 'Targaryen', Words: 'Fire and Blood', Seat: 'Dragonstone', Descent: 'Old Valyria' },
{ id: 2, House: 'Stark', Words: 'Winter is Coming', Seat: 'Winterfell', Descent: 'The First Men' },
{ id: 3, House: 'Lanister', Words: 'Hear Me Roar', Seat: 'Casterly Rock', Descent: 'The Andals' },
{ id: 4, House: 'Baratheon', Words: 'Ours is The Fury', Seat: 'Storm\'s End', Descent: 'The Andals' },
{ id: 5, House: 'Arryn', Words: 'As High as Honor', Seat: 'Eyrie', Descent: 'The Andals' },
{ id: 6, House: 'Martell', Words: 'Unbowed, Unbent, Ubroken', Seat: 'Sunspear', Descent: 'The Rhoynar' },
{ id: 7, House: 'Greyjoy', Words: 'We Do Not Sow', Seat: 'Pike', Descent: 'The First Men' },
{ id: 8, House: 'Tyrell', Words: 'Growing Strong', Seat: 'Highgarden', Descent: 'The Andals' },
];

const resolveHouseByIndex = (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) return response.sendStatus(400);

    const findHouseIndex = mockHouses.findIndex((house) => house.id === parsedId);

    if (findHouseIndex === -1) return response.sendStatus(404);

    request.findHouseIndex = findHouseIndex;
    next();
}

app.get('/', (request, response) => {
    response.send('A Song of Ice and Fire');
})

app.get('/api/houses', (request, response) => {
    const { query: { filter, value } } = request;   //  http://localhost:${PORT}/api/houses?filter=filter-value&value=value-value
    response.send(mockHouses);
})

app.get('/api/houses/:id', resolveHouseByIndex, (request, response) => {
    const { findHouseIndex } = request;

    response.status(200).send(mockHouses[findHouseIndex]);
})

app.post('/api/houses', (request, response) => {
    const { body } = request;
    const newHouse = { id: mockHouses.length + 1, ...body };

    mockHouses.push(newHouse);
    return response.sendStatus(200);
})

app.put('/api/houses/:id', resolveHouseByIndex, (request, response) => {
    const { body, findHouseIndex } = request;

    mockHouses[findHouseIndex] = { id: mockHouses[findHouseIndex].id, ...body };
    return response.sendStatus(200);
})

app.patch('/api/houses/:id', resolveHouseByIndex, (request, response) => {
    const { body, findHouseIndex } = request;

    mockHouses[findHouseIndex] = { ...mockHouses[findHouseIndex], ...body };
    return response.sendStatus(200);
})

app.delete('/api/houses/:id', resolveHouseByIndex, (request, response) => {
    const { findHouseIndex } = request;

    mockHouses.splice(findHouseIndex, 1);
    return response.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}\nhttp://localhost:${PORT}`);
})