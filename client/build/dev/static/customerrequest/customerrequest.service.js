(function () {
    'use strict';

    angular
        .module('app.customerRequest')
        .factory('customerRequestAPI', customerRequestSerivce);

    customerRequestSerivce.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function customerRequestSerivce ($http, $q, ajaxError) {
        var service = {
            getRequests: getRequests,
            removeRequest: removeRequest
        };

        return service;

        /////////////

        function getRequests () {
            return $http.get('http://localhost:8081/web/order/status?orderType=NEW')
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data.aaData;
                if (response.status === 202) {
                    return data;
                } else {
                    return $q.reject(data.message);
                }
            }
        }

        function removeRequest (id) {
            return $http.delete('http://localhost:8081/web/order', {id:id})
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                if (response.status === 200) {
                    return data;
                } else {
                    return $q.reject(data);
                }
            }
        }
    }
})();
