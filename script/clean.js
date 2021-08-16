const path = require('path');
require("rimraf").sync(path.resolve(__dirname, '../dist'), {}, function (err) { console.error(err) });