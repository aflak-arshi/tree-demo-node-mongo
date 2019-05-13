const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childTreeSchema = new Schema({
    text: {
        type: String
    },
    pid: {
        type: String
    },
    allowDrag: {
        type: Boolean
    },
    selected: {
        type: Boolean
    }
});

const TreeSchema = new Schema({
    id: {
        type: String
    },
    text: {
        type: String
    },
    pid: {
        type: String
    },
    allowDrag: {
        type: Boolean
    },
    selected: {
        type: Boolean
    },
    items: [childTreeSchema]
});




module.exports = mongoose.model('tree', TreeSchema);

