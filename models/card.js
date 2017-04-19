'use strict';

const assert = require('assert');
const OpenpayClass = require("openpay");
let openpay = new OpenpayClass(process.env.MERCHANT_ID, process.env.MERCHANT_SK, process.env.OP_IS_PRODUCTION);

module.exports = function (Card) {

    Card.beforeRemote('create', (ctx, modelInstance, next) => {
        assert(modelInstance.card_number, "There is no card_number provided");
        assert(modelInstance.holder_name, "There is no holder_name provided");
        assert(modelInstance.expiration_month, "There is no expiration_month provided");
        assert(modelInstance.expiration_year, "There is no expiration_year provided");
        assert(modelInstance.cvv2, "There is no cvv2 provided");

        if (!modelInstance.customer_id) {
            openpay.cards.create(modelInstance, (err, card) => {
                if (err) {
                    throw err;
                }
                modelInstance.card_op_id = card.id;
                next();
            });
        }
        else {
            openpay.customers.cards.create(modelInstance.customer_id, modelInstance, (err, card) => {
                if (err) {
                    throw err;
                }
                modelInstance.card_op_id = card.id;
                next();
            });
        }
    })
};
