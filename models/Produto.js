// Produto.js
var mongoose = require('mongoose');
 
// Cria um novo Schema com os campos que iremos utilizar no model Contato
var ProdutoSchema = new mongoose.Schema({
  nome: String,
  codigo : String,
  valor: {type: Number, default: 0},
});
 
//Define o model Contato
mongoose.model('Produto', ProdutoSchema);