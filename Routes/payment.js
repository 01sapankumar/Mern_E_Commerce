import express from 'express'
import { Checkout, Verify, userOrder, allOrders} from '../Controllers/payment.js';
import { Authenticated } from '../Middlewares/auth.js'

const router = express.Router();


//check out payments
router.post('/checkout', Checkout);

//verify payments or save to db
router.post('/verify-payment', Verify);

//user order 
router.get('/userorder',Authenticated, userOrder)


// all order 
router.get('/orders', allOrders)


export default router;
