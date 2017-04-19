'use strict';
const assert = require('assert');
const OpenpayClass = require("openpay");
let openpay = new OpenpayClass(process.env.MERCHANT_ID, process.env.MERCHANT_SK, process.env.OP_IS_PRODUCTION);

module.exports = function (Customer) {
    Customer.beforeRemote('create', (ctx, unused, next) => {
        let reqBody = ctx.req.body;
        if (!reqBody) {
            next(new Error("Request most have a body with data."));
        }
        assert(reqBody.name, "There is no name provided");
        assert(reqBody.email, "There is no email provided");

        openpay.customer.create(reqBody, (error, customer) => {
            if (err) {
                next(err);
            }
            reqBody.customer_id = customer.id;
            reqBody.store = customer.store;
            reqBody.creation_date = customer.creation_date;
            reqBody.clabe = customer.clabe;
            next();
        });
    });

};
