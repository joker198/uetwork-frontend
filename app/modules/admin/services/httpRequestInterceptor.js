angular.module('services').factory('httpRequestInterceptor', function ($rootScope, $q, $timeout) {
    return {
        request: function (requestConfig) {
            $rootScope.showToaster = true;
            if (sessionStorage['Admin-Data']) {
                requestConfig.headers['auth-token'] = sessionStorage['Admin-Data'];
            }
            requestConfig.headers['Content-Type'] = 'application/json';
            return requestConfig;
        },
        response: function (response) {

            return response;
        },
        responseError: function (response) {

            return $q.reject(response);
        }
    };
});
angular.module('services').config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});
