const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const info = console.log;
const error = console.error;

const modelsDir = path.resolve(__dirname + '/../models/');
const parentProjModelsDir = path.resolve(__dirname + '/../../../common/models/');

fs.stat(parentProjModelsDir, (err) => {
    try {
        if (err) {
            error(chalk.red("There is no common/models directory in your loopback app. " +
                "Are you sure you installed this package inside loopback app?\n"));
            throw err;
        }
        info(chalk.green("Creating models..."));
        fs.createReadStream(modelsDir + '/card.js').pipe(fs.createWriteStream(parentProjModelsDir + '/card.js'));
        fs.createReadStream(modelsDir + '/card.json').pipe(fs.createWriteStream(parentProjModelsDir + '/card.json'));
        fs.createReadStream(modelsDir + '/customer.js').pipe(fs.createWriteStream(parentProjModelsDir + '/customer.js'));
        fs.createReadStream(modelsDir + '/customer.json').pipe(fs.createWriteStream(parentProjModelsDir + '/customer.json'));
        fs.createReadStream(modelsDir + '/request-openpay.js').pipe(fs.createWriteStream(parentProjModelsDir + '/request-openpay.js'));
        fs.createReadStream(modelsDir + '/request-openpay.json').pipe(fs.createWriteStream(parentProjModelsDir + '/request-openpay.json'));
        info(chalk.blue("Check README file to enable models in your app."));
    }
    catch (ex) {
        error(chalk.red(ex.message));
    }
});

