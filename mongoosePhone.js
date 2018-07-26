const mongoose = require('mongoose');
let url = 'mongodb:://saul:saul0989@ds245971.mlab.com:45971/buscacel';
mongoose.connect(url);

const Schema = mongoose.Schema,
                ObjectId = Schema.ObjectId
const celularSchema = new Schema({
  uid:ObjectId,
  marca:String,
  modelo:String,
  sistemaOperativo:String,
})

var Celular = mongoose.model('Celular', celularSchema)

module.exports = Celular
