var shop = module.exports = require('../../chapter')(__dirname)

if (!module.parent) shop.execute(process.argv.slice(2));
