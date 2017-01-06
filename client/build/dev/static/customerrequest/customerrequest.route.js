(function () {
    'use strict';

    angular
        .module('app.phone')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.customerrequest',
                config: {
                    url: '/customerrequest',
                    views: {
                        'main@': {
                            templateUrl: 'static/customerrequest/customerrequest.html',
                            controller: 'CustomerRequestController as vm'
                        }
                    },
                    data: {
                        title: 'Customer Request',
                        _class: 'phone',
                        requireLogin: false
                    },
                    sidebar: {
                        icon: 'mdi-cellphone-android',
                        text: 'Requests'
                    },
                    breadcrumb: 'Request List'
                }
            }
        ];
    }
})();
