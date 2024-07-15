import { mockHouses } from "./Utils.mjs"
import { mockSigils } from "./Utils.mjs";

export const resolveHouseByIndex = (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) return response.sendStatus(400);

    const findIndex = mockHouses.findIndex((house) => house.id === parsedId);

    if (findIndex === -1) return response.sendStatus(404);
    request.findIndex = findIndex;
    next();
}

export const resolveSigilByIndex = (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) return response.sendStatus(400);

    const findIndex = mockSigils.findIndex((sigil) => sigil.id === parsedId);

    if (findIndex === -1) return response.sendStatus(404);
    request.findIndex = findIndex;
    next();
}

export const validationCheck = (request, response, next) => {
    request.sessionStore.get(request.sessionID, (err, session) => {
        console.log(session);
    })

    if (request.session.user) {
        next();
    } else
        return response.sendStatus(401);
}