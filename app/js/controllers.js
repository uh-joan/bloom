angular
    .module('appBloom')
    .controller('BouquetsController', ['$scope', '$http', function ($scope, $http) {
        $scope.bouquets=[];

        //get data from file
        //
        $http.get ('data/collections.json').success(function(data){
            angular.forEach(data.collections, function(collection){
                angular.forEach(collection.skus, function(sku){
                    //lowest_price is in collection.
                    var db = sku.default_bouquet;
                    db['lowest_price'] = collection.lowest_price;
                    $scope.bouquets.push(db);
                });
            });
            $scope.bouquetImg = $scope.bouquets[0].image_urls.website_main;
            $scope.lowest_price = $scope.bouquets[0].lowest_price;
            $scope.selected_bouquet = $scope.bouquets[0].id;
            $scope.bouquet_name = $scope.bouquets[0].name;
        });

        //set deliveries and subscriptions options
        $scope.deliveries = [
            {'name': 'month',
                'amount': '1',
                'selected': true},
            {'name': 'fortnight',
                'amount': '2',
                'selected': false},
            {'name': 'week',
                'amount': '4',
                'selected': false},
        ];
        $scope.subscriptions = [
            {'name': '3 months',
                'amount': '3',
                'selected': true},
            {'name': '6 months',
                'amount': '6',
                'selected': false},
            {'name': '12 months',
                'amount': '12',
                'selected': false},
            {'name': 'on-going',
                'amount': '1',
                'selected': false}
        ];

        //set initial values
        $scope.deliveries.forEach (function (delivery)
            {if (delivery.selected == true) $scope.selected_delivery = delivery.amount;
        });
        $scope.subscriptions.forEach (function (subscription)
        {if (subscription.selected == true) $scope.selected_subscription = subscription.amount;
        });

        // when bouquet is selected set image and bouquet price
        $scope.setImageAndPriceBouquet = function(bouquetId){
            $scope.bouquets.forEach (function (bouquet)
            {if (bouquet.id == bouquetId)
               {
                   $scope.bouquetImg = bouquet.image_urls.website_main;
                   $scope.lowest_price = bouquet.lowest_price;
                   $scope.bouquet_name = bouquet.name;
               }
            });
        };

        //Date picker stuff
        //
        //set date tomorrow
        $scope.tomorrow = function() {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate()+1);
            $scope.dt = tomorrow;
            $scope.minDate = $scope.minDate ? null : tomorrow;
        };
        $scope.tomorrow();
        // disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };
        // when clicked on date open calendar
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
        // some date options
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: false
        };

        // to hide/show the correction text
        $scope.toggle_correction = false;
        // when date changes check that is within ranges to apply correction
        $scope.checkDate = function(){
            var fromDate=Date.parse("Tue Dec 23 2014 00:00:00 GMT+0000 (GMT)");
            var toDate=Date.parse("Fri Jan 03 2015 00:00:00 GMT+0000 (GMT)");

            if ( $scope.dt <= toDate && $scope.dt >= fromDate )
                {
                    $scope.date_correction = 3.5;
                    $scope.toggle_correction = true;
                }
            else
                {
                    $scope.date_correction = 0;
                    $scope.toggle_correction = false;
                }
        }
    }]);