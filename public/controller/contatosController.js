

app
    .controller('contatosController', ['$scope','$http',function($scope, $http) {    
 
        // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
        var refresh = function (){
            $http
                .get('/api/contatos')
                .then(
                    function(data) {
                        $scope.contatos = data.data;
                        $scope.formContato = {};
                        console.log("contatos: ", data);
                    },
                    function(data) {
                        console.log('Error: ' + data);
                    }
                )         
        };
        refresh();
    
        // Quando clicar no botão Criar, envia informações para a API Node
        $scope.criarContato = function() {
            $http
                .post('/api/contatos', $scope.formContato)
                .then(function(data) {
                        // Limpa o formulário para criação de outros contatos
                        $scope.formContato = {};
                        $scope.contatos = data.data;
                        console.log(data);
                    },
                    function(data) {
                        console.log('Error: ' + data);
                    }
                )
        };
    
        // Ao clicar no botão Remover, deleta o contato
        $scope.deletarContato = function(id) {
            $http
                .delete('/api/contatos/' + id)
                .then(function(data) {
                        $scope.contatos = data.data;
                        console.log(data);
                    },function(data) {
                        console.log('Error: ' + data);
                    }
                )
        };
    
        // Ao clicar no botão Editar, edita o contato
        $scope.editarContato = function(id) {
            $http.get('/api/contatos/' + id)
                .then(function(data) {
                    $scope.formContato = data.data;
                    console.log(data);
                },function(data) {
                    console.log('Error: ' + data);
                })
            };
    
        // Recebe o JSON do contato para edição e atualiza
        $scope.atualizarContato = function() {        
            $http.put('/api/contatos/' + $scope.formContato._id, $scope.formContato)
                .then(function(response){
                    refresh();
                })
        };
    
    }])

