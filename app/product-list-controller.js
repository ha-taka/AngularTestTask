var myApp = angular.module('myApp');

myApp.controller('ProductListCtrl', function() {
    this.products = [
        {Name: 'tomatoes',
        SKU: '123',
        Price: '3.32'},
        {Name: 'potatoes',
         SKU: '345',
         Price: '4.32'}
    ];

    this.selectedIndex = -1;

    this.remove = function(index) {
        if (confirm("Are you sure to delete?")) {
            if (index === this.selectedIndex) {
                this.clearFields();
                this.selectedIndex = -1;
                this.editing = false;
            } else {
                if (index < this.selectedIndex) {
                    this.selectedIndex = this.selectedIndex - 1;
                }
            }
            this.products.splice(index, 1);
        }
    };

    this.edit = function(index) {
        this.selectedName = this.products[index].Name;
        this.selectedSKU = this.products[index].SKU;
        this.selectedPrice = this.products[index].Price;

        this.selectedIndex = index;
    };

    this.export = function() {
        console.log("***** Products List *****")
        angular.forEach(this.products, function(product) {
            console.log(product);
        })
    }
});