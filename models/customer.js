'use strict';
const assert = require('assert');
const OpenpayClass = require("openpay");
let openpay = new OpenpayClass(process.env.MERCHANT_ID, process.env.MERCHANT_SK, process.env.OP_IS_PRODUCTION || false);

module.exports = function (Customer) {
    Customer.beforeRemote('create', (ctx, modelInstance, next) => {
        assert(modelInstance.name, "There is no name provided");
        assert(modelInstance.email, "There is no email provided");

        openpay.customer.create(modelInstance, (error, customer) => {
            if (err) {
                throw err;
            }
            modelInstance.customer_id = customer.id;
            modelInstance.store = customer.store;
            modelInstance.creation_date = customer.creation_date;
            modelInstance.clabe = customer.clabe;
            next();
        })
    });

};
