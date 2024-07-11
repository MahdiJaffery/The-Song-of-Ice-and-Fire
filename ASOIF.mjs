import express from 'express';
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

app.get('/', (request, response) => {
    response.send('A Song of Ice and Fire');
})

app.get('/api/houses', (request, response) => {
    response.send(mockHouses);
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}\nhttp://localhost:${PORT}`);
})