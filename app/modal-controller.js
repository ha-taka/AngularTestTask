var myApp = angular.module('myApp');

myApp.controller('ModalCtrl', function($modal, $scope) {
    $scope.open = function() {
        var mainCtrl = $scope.$parent.main;

        var modalInstance = $modal.open({
            templateUrl: 'modalDialog.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                name: function () {
                    return (mainCtrl.selectedIndex === -1 ? '':mainCtrl.selectedName);
                },
                sku: function () {
                    return (mainCtrl.selectedIndex === -1 ? '':mainCtrl.selectedSKU);
                },
                price: function () {
                    return (mainCtrl.selectedIndex === -1 ? '':mainCtrl.selectedPrice);
                },
                edited: function() {
                    return mainCtrl.selectedIndex !== -1;
                }
            }
        });

        modalInstance.result.then(function (product) {
            if (mainCtrl.selectedIndex == -1) {
                mainCtrl.products.push({'Name': product.Name, 'SKU': product.SKU, 'Price': product.Price});
            }
            else {
                mainCtrl.products[mainCtrl.selectedIndex].Name = product.Name;
                mainCtrl.products[mainCtrl.selectedIndex].SKU = product.SKU;
                mainCtrl.products[mainCtrl.selectedIndex].Price = product.Price;

                mainCtrl.selectedIndex = -1;
            }
        }, function() {
            mainCtrl.selectedIndex = -1;
        });
    };
});

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, name, sku, price, edited) {
    $scope.Name = name;
    $scope.SKU = sku;
    $scope.Price = price;
    $scope.edited = edited;

    $scope.ok = function () {
        var product = {'Name': $scope.Name, 'SKU': $scope.SKU, 'Price': $scope.Price};
        $modalInstance.close(product);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});