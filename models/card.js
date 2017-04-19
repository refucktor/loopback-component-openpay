'use strict';

const assert = require('assert');
const OpenpayClass = require("openpay");
let openpay = new OpenpayClass(process.env.MERCHANT_ID, process.env.MERCHANT_SK, process.env.OP_IS_PRODUCTION);

module.exports = function (Card) {

    Card.beforeRemote('create', (ctx, unused, next) => {
        let reqBody = ctx.req.body;
        if (!reqBody) {
            next(new Error("Request most have a body with data."));
        }
        assert(reqBody.card_number, "There is no 'card_number' provided");
        assert(reqBody.holder_name, "There is no 'holder_name' provided");
        assert(reqBody.expiration_month, "There is no 'expiration_month' provided");
        assert(reqBody.expiration_year, "There is no 'expiration_year' provided");
        assert(reqBody.cvv2, "There is no 'cvv2' provided");

        if (!reqBody.customer_id) {
            openpay.cards.create(reqBody, (err, card) => {
                if (err) {
                    next(err);
                }
                reqBody.card_op_id = card.id;
                next();
            });
        }
        else {
            openpay.customers.cards.create(reqBody.customer_id, reqBody, (err, card) => {
                if (err) {
                    next(err);
                }
                reqBody.card_op_id = card.id;
                next();
            });
        }
    })
};
