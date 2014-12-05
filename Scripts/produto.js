var produtos = [
    { Id: 1, Titulo: "Produto 1", Descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, facilis." },
    { Id: 2, Titulo: "Produto 2", Descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, facilis." },
    { Id: 3, Titulo: "Produto 3", Descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, facilis." },
    { Id: 4, Titulo: "Produto 4", Descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, facilis." },
    { Id: 5, Titulo: "Produto 5", Descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, facilis." }
];

var detalhes = [
    { Id: 1, Descricao: "Detalhe 1", ProdutoId: 1 },
    { Id: 2, Descricao: "Detalhe 2", ProdutoId: 1 },
    {Id: 3, Descricao: "Detalhe 2", ProdutoId: 2},
    { Id: 4, Descricao: "Detalhe 3", ProdutoId: 3}
];

var itensDetalhe =  [
       { Id: 1, Descricao: "Item 1 Detalhe 1", Valor: "1", DetalheId: 1 },
       { Id: 2, Descricao: "Item 2 Detalhe 1", Valor: "2", DetalheId: 1},
       { Id: 3, Descricao: "Item 3 Detalhe 1", Valor: "3", DetalheId: 1},
       { Id: 4, Descricao: "Item 1 Detalhe 2", Valor: "1", DetalheId: 2 },
       { Id: 5, Descricao: "Item 2 Detalhe 2", Valor: "2", DetalheId: 3 },
       { Id: 6, Descricao: "Item 3 Detalhe 2", Valor: "3", DetalheId: 3 },
       { Id: 7, Descricao: "Item 1 Detalhe 3", Valor: "1", DetalheId: 3 },
       { Id: 8, Descricao: "Item 2 Detalhe 3", Valor: "2", DetalheId: 3 },
       { Id: 9, Descricao: "Item 3 Detalhe 3", Valor: "3", DetalheId: 4 }
];

var imagens = [
    { Id: 1, UrlImagem: "http://placehold.it/350x350", ProdutoId: 1 },
    { Id: 2, UrlImagem: "http://placehold.it/350x350", ProdutoId: 1 },
    { Id: 3, UrlImagem: "http://placehold.it/350x350", ProdutoId: 1 },
    { Id: 4, UrlImagem: "http://placehold.it/350x350", ProdutoId: 2 },
    { Id: 5, UrlImagem: "http://placehold.it/350x350", ProdutoId: 3 },
    { Id: 6, UrlImagem: "http://placehold.it/350x350", ProdutoId: 4 },
];


//var ngProdutos = angular.module("ngProdutos", ['ngResource']);
var ngProdutos = angular.module("ngProdutos", []);

ngProdutos.factory("ProdutoService", function () {

    var listaProdutos = produtos;

    function get(id) {
        return getObjects(listaProdutos, 'Id', id);
    };

    function getProdutoImages(produtoId) {
        return getObjects(imagens, 'ProdutoId', produtoId);
    };

    function getProdutoDetalhes(produtoId) {

        console.log(detalhes);
        var lstDetalhes = getObjects(detalhes, 'ProdutoId', produtoId);

        return lstDetalhes;
    };

    function getItemDetalheProduto(detalheId)
    {
        var listaItemDetalhes = getObjects(itensDetalhe, 'DetalheId', detalheId);

        return listaItemDetalhes;
    };
    function getProdutoDetalhe(detalheId) {
        return getObjects(detalhes, 'Id', detalheId);
    };

    function novoProduto() {
        return { Id: 0, Titulo: "", Descricao: "" };
    };

    function salvarProduto(produto) {
        if (produto.Id > 0) {
            produtos[produtos.indexOf(produto.Id)] = produto;
        } else {
            produto.Id = produtos.length;
            produtos.push(produto);
        }
    };

    function novaImagem() {
        return { Id: 0, UrlImagem: "" };
    };


    function salvarImagem(imagem) {
        if (imagem.Id > 0) {
            imagens[imagens.indexOf(imagem.Id)] = imagem;

        } else {
            imagem.Id = imagem.length;
            imagens.push(imagem);
        }
    };

    function novoDetalhe() {
        return { Id: 0, Descricao: "" };
    };


    function salvarDetalhe(detalhe) {
        if (detalhe.Id > 0) {
            detalhes[detalhes.indexOf(detalhe.Id)] = detalhe;

        } else {
            detalhe.Id = detalhe.length;
            detalhes.push(detalhe);
        }
    };

    function novoitemDetalhe(detalheId){

        return {Id:0,Descricao:'',DetalheId:detalheId};
    };

    function salvarItemDetalhe(itemDetalhe){
        if(itemDetalhe.Id > 0 )
        {
            itensDetalhe[itensDetalhe.indexOf(itemDetalhe.Id)] = itemDetalhe;

        }else{
            itensDetalhe.push(itemDetalhe);
        }
    
    };

    return {

        get: get,
        getProdutoImages: getProdutoImages,
        novaImagem: novaImagem,
        salvarImagem: salvarImagem,


        getProdutoDetalhes: getProdutoDetalhes,
        getItemDetalheProduto: getItemDetalheProduto,

        novoDetalhe: novoDetalhe,
        salvarDetalhe: salvarDetalhe,

        novoProduto: novoProduto,
        salvarProduto: salvarProduto,


        novoitemDetalhe : novoitemDetalhe,
        salvarItemDetalhe:salvarItemDetalhe
    };

});


ngProdutos.controller("produtoCtrl", ['$scope', 'ProdutoService', function ($scope, ProdutoService) {

    var
		$ = jQuery
    //ng = $scope,
    //aj = $http,
    //wi = $window
    ;


    var limit = 20;
    $scope.dadosProdutos = produtos;

    $scope.modoInclusaoItemDetalhe = [];

    $scope.pesquisar = function (id) {
        var produto = ProdutoService.get($scope.produtoId);
        $scope.Produto = produto;
        $scope.produtoIdSelecionado = id;
        //})
    };


    $scope.editar = function (item) {
        $scope.produto = item;
        $scope.produtoIdSelecionado = item.Id;
    };


    $scope.salvarProduto = function () {
        ProdutoService.salvarProduto($scope.produto);
    }

    $scope.novoProduto = function () {
        $scope.produto = ProdutoService.novoProduto();
    }

    
    $scope.verImagens = function (item) {
        var lstImagens = ProdutoService.getProdutoImages(item.Id);

        $scope.produtoIdSelecionado = item.Id;

        $scope.listaImagens = lstImagens;
    };

    $scope.obterImagens = function () {
        $scope.listaImagens = ProdutoService.getProdutoImages($scope.produtoId);
    };

    $scope.novaImagem = function () {
        $scope.modoInclusaoImagem = true;
        $scope.imagem = ProdutoService.novaImagem();
    };

    $scope.editarImagem = function (imagem) {
        $scope.modoInclusaoImagem = true;
        $scope.imagem = imagem;
    };


    $scope.salvarImagem = function () {
        $scope.imagem.ProdutoId = $scope.produtoIdSelecionado;
        console.log($scope.imagem);

        ProdutoService.salvarImagem($scope.imagem);

        $scope.listaImagens = ProdutoService.getProdutoImages($scope.produtoIdSelecionado);

        $scope.modoInclusaoImagem = false;
    };
    

    $scope.verDetalhes = function (item) {
        var lstDetalhes = ProdutoService.getProdutoDetalhes(item.Id);

        $scope.produtoIdSelecionado = item.Id;

        $scope.listaDetalhes = lstDetalhes;
    };


    $scope.verItensDetalhe = function (detalheId) {

        var lstRetorno = ProdutoService.getItemDetalheProduto(detalheId);
        return lstRetorno;
    };

    $scope.novoDetalheProduto = function () {
        $scope.modoInclusaoDetalhe = true;
        $scope.detalhe = ProdutoService.novoDetalhe();

    };
    $scope.editarDetalhe = function (detalhe) {
        $scope.modoInclusaoDetalhe = true;
        $scope.detalhe = detalhe;
    };

    $scope.salvarDetalhe = function () {
        
        $scope.detalhe.ProdutoId = $scope.produtoIdSelecionado;
        console.log($scope.detalhe);
        ProdutoService.salvarDetalhe($scope.detalhe);
        $scope.listaDetalhes = ProdutoService.getProdutoDetalhes($scope.produtoIdSelecionado);
        $scope.modoInclusaoDetalhe = false;
    };


    $scope.novoItemDetalhe = function (detalheId) {
        $scope.detalheIdSelecionado = detalheId;
        $scope.modoInclusaoItemDetalhe[detalheId] = true;
        $scope.itemDetalhe = ProdutoService.novoitemDetalhe(detalheId);

    };
    $scope.editarItemDetalhe = function (item) {
        $scope.modoInclusaoItemDetalhe[item.DetalheId] = true;
        $scope.itemDetalhe = item;
    };

    $scope.salvarItemDetalhe = function () {

        //var detalhe = ProdutoService.getProdutoDetalhe($scope.itemDetalhe.DetalheId);
        console.log($scope.itemDetalhe);
        ProdutoService.salvarItemDetalhe($scope.itemDetalhe);

        //$scope.lstDetalhes = ProdutoService.getProdutoDetalhes($scope.produtoIdSelecionado);
        $scope.modoInclusaoItemDetalhe[$scope.detalheIdSelecionado] = false;
    };


}]);

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}