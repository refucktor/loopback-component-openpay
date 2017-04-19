'use strict';
const assert = require('assert');
const OpenpayClass = require("openpay");
let openpay = new OpenpayClass(process.env.MERCHANT_ID, process.env.MERCHANT_SK, process.env.OP_IS_PRODUCTION);

module.exports = function (RequestOpenpay) {
    /**
     * Create a charge for a customer
     * @param customer_id
     * @param charge
     * @param cb
     */
    RequestOpenpay.customerCharge = (customer_id, charge, cb) => {
        assert(customer_id, "There is no 'customer_id' provided");
        assert(charge.source_id, "There is no 'source_id' provided");
        assert(charge.amount, "There is no 'amount' provided");
        assert(charge.description, "There is no 'description' provided");
        assert(charge.device_session_id, "There is no 'device_session_id' provided");

        openpay.customers.charges.create(customer_id, charge, (err, charge) => {
            if (err) {
                RequestOpenpay.create({
                    date: new Date(Date.now()),
                    error: err
                });
                cb(err);
            }
            RequestOpenpay.create({
                date: new Date(Date.now()),
                response: charge
            }, (error, model) => {
                cb(null, model);
            });
        });
    };

    RequestOpenpay.remoteMethod('customerCharge', {
        http: {path: '/customerCharge', verb: 'post'},
        accepts: [
            {arg: 'customer_id', type: 'string', http: {source: 'query'}, required: 'true'},
            {arg: 'charge', type: 'object', http: {source: 'body'}, required: 'true'}
        ],
        returns: {arg: 'requestOpenpay', type: 'object'}
    });


    /**
     * Create a charge for merchant
     * @param charge
     * @param cb
     */
    RequestOpenpay.merchantCharge = (charge, cb) => {
        assert(charge.source_id, "There is no 'source_id' provided");
        assert(charge.amount, "There is no 'amount' provided");
        assert(charge.description, "There is no 'description' provided");
        assert(charge.device_session_id, "There is no 'device_session_id' provided");
        assert(charge.customer, "There is no 'customer' provided");

        openpay. charges.create(customer_id, charge, (err, charge) => {
            if (err) {
                RequestOpenpay.create({
                    date: new Date(Date.now()),
                    error: err
                });
                cb(err);
            }
            RequestOpenpay.create({
                date: new Date(Date.now()),
                response: charge
            }, (error, model) => {
                cb(null, model);
            });
        });
    };

    RequestOpenpay.remoteMethod('merchantCharge', {
        http: {path: '/merchantCharge', verb: 'post'},
        accepts: [
            {arg: 'charge', type: 'object', http: {source: 'body'}, required: 'true'}
        ],
        returns: {arg: 'requestOpenpay', type: 'object'}
    });
};
