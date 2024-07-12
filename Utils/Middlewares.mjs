import { mockHouses, mockSigils } from './Utils.mjs';

export const resolveHouseByIndex = (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) return response.sendStatus(400);

    const houseIndex = mockHouses.findIndex((house) => house.id === parsedId);

    if (houseIndex === -1) return response.sendStatus(404);
    request.houseIndex = houseIndex;
    next();
}

export const resolveSigilByIndex = (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) return response.sendStatus(400);

    const sigilIndex = mockSigils.findIndex((house) => house.id === parsedId);

    if (sigilIndex === -1) return response.sendStatus(404);
    request.sigilIndex = sigilIndex;
    next();
}