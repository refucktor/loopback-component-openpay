const chalk = require('chalk');
const info = console.info;
const warn = console.warn;
const error = console.error;

module.exports = function (lbapp, options) {
    try {
        lbapp.on('started', () => {
            process.env.OP_IS_PRODUCTION = !!options.isProduction;
            info(chalk.blue('\nLoopback component for openpay was enabled.'));
        });
    }
    catch (ex) {
        error(chalk.red(ex.message));
    }
};
