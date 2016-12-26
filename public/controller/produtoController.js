app
    .controller('produtoController', ['$scope','$http', function($scope, $http) {    
 
    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function (){
        $http.get('/api/produtos')
            .then(
                function(response) {
                    $scope.produtos = response.data;
                    $scope.formProduto = {};
                    console.log("produtos: ", response.data);
                },
                function(error) {
                    console.log('Error: ' + error);
                }
            )
    };
    refresh();
 
    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarProduto = function() {

        console.log('clicked');

        $http.post('/api/produtos', $scope.formProduto)
            .then(
                function(response) {
                    // Limpa o formulário para criação de outros contatos
                    $scope.formProduto = {};
                    $scope.produtos = response.data;
                    console.log(response);
                },
                function(error) {
                    console.log('Error: ' + error);
                }
            );
    };
 
    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarProduto = function(id) {
        $http.delete('/api/produtos/' + id)
            .then(
                function(response) {
                    $scope.produtos = response.data;
                    console.log(response);
                },
                function(error) {
                    console.log('Error: ' + error);
                }
            );
    };
 
    // Ao clicar no botão Editar, edita o contato
    $scope.editarProduto = function(id) {
        $http.get('/api/produtos/' + id)
            .then(
                function(data) {
                    $scope.formProduto = data;
                    console.log(data);
                },
                function(data) {
                    console.log('Error: ' + data);
                }
            );
    };
 
    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarProduto = function() {        
        $http.put('/api/produtos/' + $scope.formProduto._id, $scope.formProduto)
        .then( function(response){
            refresh();
        });
    };
} ]);
