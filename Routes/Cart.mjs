import { Router } from "express";
import { validationCheck } from "../Utils/Middlewares.mjs";
const router = Router();

router.get('/api/cart', validationCheck, (request, response) => {
    return request.session.cart ? response.status(200).send(request.session.cart) : response.status(200).send('No Items added to Cart');
})

router.post('/api/cart', validationCheck, (request, response) => {
    const { body: item } = request;
    const { cart } = request.session;

    if (cart) {
        cart.push(item);
    } else {
        request.session.cart = [item];
    }
    return response.sendStatus(200);
})

router.post('/api/cart/checkout', validationCheck, (request, response) => {
    if (!request.session.cart) return response.status(200).send('Cart Empty');

    let totalPrice = 0, items = [];

    request.session.cart.forEach(element => {
        items.push(element.Item);
        totalPrice += parseInt(element.Price);
    });
    console.log('Total Price: $' + totalPrice);
    request.session.cart = undefined;
    return response.send(`Items:${items}\nTotal Price: $${totalPrice}`);
})

export default router;