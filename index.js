const chalk = require('chalk');
const info = console.info();
const warn = console.warn;
const error = console.error;

module.exports = function (lbapp) {
    try {
        lbapp.on('started', () => {
            info(chalk.blue('Loopback component for openpay was enabled.'));
        });
    }
    catch (ex) {
        error(chalk.red(ex.message));
    }
};
