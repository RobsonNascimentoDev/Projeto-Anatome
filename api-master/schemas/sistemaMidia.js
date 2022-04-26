var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquemaMidia = require('./midia')

var esquemaSistemaMidia = new Schema({
    _id: String,
    midias: [esquemaMidia],
    texto: String,
}, {_id: false});  

module.exports = esquemaSistemaMidia;