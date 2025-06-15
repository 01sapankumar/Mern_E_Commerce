import {Payment} from "../Models/Payment.js"
import Razorpay from 'razorpay';
import dotenv from 'dotenv'

dotenv.config()
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// user checkout page
export const Checkout = async (req, res) => {
    const { amount, cartItems, userShipping, userId } = req.body;

    var options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
        orderId: order.id,
        amount: amount,
        cartItems,
        userShipping,
        userId,
        payStatus: "created",
    });
};

// The `verify` function is outside of `checkout` and correctly exported.
export const Verify = async (req, res) => {
    try {
      const { orderId, paymentId, signature, amount, orderItems, userId, userShipping } = req.body;
  
      const orderConfirm = await Payment.create({
        orderId,
        paymentId,
        signature,
        amount,
        orderItems,
        userId,
        userShipping,
        payStatus: "paid",
      });
  
      res.json({ message: "Payment successful...", success: true, orderConfirm });
    } catch (error) {
      console.error("Error saving payment data:", error.message);
    }
  };

  // user order 
   export const userOrder = async (req, res) =>{
    let userId = req?.user?._id?.toString();
    let orders = await Payment.find({userId: userId}).sort({ orderDate :- 1});
    res.json(orders)
   }
  
   //user allorders

   export const allOrders = async (req, res)  =>{
    let orders = await Payment.find().sort({ orderDate :-1});
    res.json(orders)
   }