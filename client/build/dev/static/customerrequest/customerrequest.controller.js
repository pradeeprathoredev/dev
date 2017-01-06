(function () {
    'use strict';

    angular
        .module('app.customerRequest')
        .controller('CustomerRequestController', CustomerRequestController);

    CustomerRequestController.$inject = ['customerRequestAPI', 'LxNotificationService',
     '$scope', '$filter'];
    /* @ngInject */
    function CustomerRequestController (customerRequestAPI, LxNotificationService,
     $scope, $filter) {
        var vm = this;

        vm.deleteRequest = deleteRequest;

        init();
        ////////////
        $scope.gridOptions = {getData : function () {
            customerRequestAPI.getRequests()
                .then(function (data) {
                    vm.requests = data;
                });
        }};

        function init () {
            _getRequestList();
        }

        function _getRequestList () {
            customerRequestAPI.getRequests()
                .then(function (data) {
                    vm.requests = data;
                });
        }

        function deleteRequest (id, name) {
            LxNotificationService.confirm('Are your sure?',
                'Customer  [' + name + '] with RequestID [' + id + ']  will be REMOVED!',
                {cancel:'cancel', ok:'delete'},
                function (answer) {
                    if (answer) {
                        _doDelete(id);
                    }
                }
            );
        }

        function _doDelete (id) {
            customerRequestAPI.removeRequest(id)
                .then(_success)
                .catch(_error);

            function _success (data) {
                _getRequestList();
            }

            function _error (message) {
                LxNotificationService.alert('Delete phone error', message, 'OK', function () {
                    _getRequestList();
                });
            }
        }
    }
})();
