import express from 'express';
// import Transaction from '../models/paymentModel';
const router = express.Router();
import stripe from "stripe";


import { v4 as uuidv4 } from "uuid";
const stripeClient = stripe("sk_test_51OmVkmHGq8hdLEpwAmp2gzWQsoHAPexCum5ZYvMU2CuwuQpRyBcip5dw7WQdswnO6bRTlmioH6K69IUbDIKRmvYY00DDCebak3");



router.post("", (req, res) => {
    const { product, token } = req.body;
    const transactionKey = uuidv4();
    return stripeClient.customers.create({
        email: token.email,
        source: token.id
    }).then((customer) => {
        stripeClient.charges.create({
            amount: product.price,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Payment failed" });
        });
    });
});

export default router;