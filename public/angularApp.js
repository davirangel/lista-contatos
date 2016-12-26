// public/angularApp.js
 
// Criamos um módulo Angular chamado listaContatos
'use strict;'
 
var app = angular
    .module("listaContatos", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "views/contato.html",
            controller: 'contatosController'
        })
        .when("/produto", {
            templateUrl : "views/produto.html",
            controller: 'produtoController'
        });
    });

