import { mockHouses } from "./Houses.mjs";

export const resolveHouseByIndex = (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) return response.sendStatus(400);

    const findHouseIndex = mockHouses.findIndex((house) => house.id === parsedId);

    if (findHouseIndex === -1) return response.sendStatus(404);

    request.findHouseIndex = findHouseIndex;
    next();
}

// export default resolveHouseByIndex;