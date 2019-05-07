const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreeSchema = new Schema({
    text: {
        type: String
    },
    pid: {
        type: String
    },
    allowDrag: {
        type: Boolean
    }
});


module.exports = mongoose.model('tree', TreeSchema);

