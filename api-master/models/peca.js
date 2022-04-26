var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquemaGeneralidade = require('../schemas/generalidade');
var esquemaNomeMidia = require('../schemas/PecaSchema/nomeMidia');
var esquemaRegiaoMidia = require('../schemas/PecaSchema/regiaoMidia');
var esquemaSistemaMidia = require('../schemas/PecaSchema/sistemaMidia');

var esquemaPeca = new Schema({
    _id: String,
    nome: String,
    sistema: String,
    regiao: String,
    partes: [{ type: String, ref: 'Parte' }],
    conteudoTeorico: [{ type: String, ref: 'ConteudoTeorico' }],
    generalidades: [esquemaGeneralidade],
    nomeMidia: [esquemaNomeMidia],
    regiaoMidia: [esquemaRegiaoMidia],
    sistemaMidia: [esquemaSistemaMidia]
}, {_id: false});


var Peca = mongoose.model('Peca', esquemaPeca);   

module.exports = Peca;