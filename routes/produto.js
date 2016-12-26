// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Produto = mongoose.model('Produto');
 
// ROTA BUSCAR ============================================
router.get('/', function(req, res) {
    // utilizaremos o mongoose para buscar todos os produtos no BD
    Produto.find(function(err, produtos) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os produtos encontrados no BD
        res.json(produtos); 
    });
});
 
// ROTA CRIAR =============================================
router.post('/', function(req, res , next) {
    // Cria um produto, as informações são enviadas por uma requisição AJAX pelo Angular
    Produto.create(
        req.body, //the object
        function(err, produto) {
            if (err)
                next(err);
            // Busca novamente todos os produtos após termos inserido um novo registro
            Produto.find(function(err, produtos) {
                if (err)
                    next(err);
                res.json(produtos);
            });
        });
 
});
 
// ROTA DELETAR ============================================
router.delete('/:produto_id', function(req, res) {
    // Remove o produto no Model pelo parâmetro _id
    Produto.remove({
        _id : req.params.produto_id
    }, function(err, produto) {
        if (err)
            res.send(err);
        // Busca novamente todos os produtos após termos removido o registro
        Produto.find(function(err, produtos) {
            if (err)
                res.send(err)
            res.json(produtos);
        });
    });
});
 
// ROTA EDITAR =============================================
router.get('/:produto_id', function(req, res) {
    // Busca o produto no Model pelo parâmetro id
    Produto.findOne({
        _id : req.params.produto_id
    }, function(err, produto) {
        if (err)
            res.send(err);
        res.json(produto);
    });
});
 
// ROTA ATUALIZAR ==========================================
router.put('/:produto_id', function(req, res) {
    // Busca o Produto no Model pelo parâmetro id
    var produtoData = req.body;
    var id = req.params.Produto_id;
 
    Produto.update( 
        {_id: id }, 
        produtoData, 
        { upsert: true}, 
        function(err, produto) {
            if (err) res.send(err);
            res.json(produto);
    });
    
});
 
// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('*', function(req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/produto.html');
});
 
module.exports = router;
	