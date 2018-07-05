const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const signatureSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
})
const Signature = mongoose.model('Signature', signatureSchema);
module.exports = Signature;
