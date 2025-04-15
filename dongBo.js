// File: dongBo.js
require('dotenv').config();
require('./config/configMongoDB');

var modelPhone = require('./models/itemPhone');


const UPDATE = async () => {
    const data = await modelPhone.find({});
    for (let i = 0; i < data.length; i++) {
        data[i].outstanding = false;
        await data[i].save(); // Cập nhật từng record
    }
    console.log("Update successful!");
}
// find + for + save = update many

UPDATE();