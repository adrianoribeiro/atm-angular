(function() {
	angular
		.module('atm-angular')
		.factory('RestService', RestService);

	function RestService($http) {

            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            };

            let configJson = {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };

            return {
                post: function (url, params) {
                    let dados = $http
                            .post(url, params, configJson)
                            .then(function (data, status, headers, config) {
                                return data;
                            }, function (data, status, headers, config) {
                        throw { 'objeto' : data, 'status' : data.status };
                    });
                    return dados;
                },
                put: function (url, params) {
                    let dados = $http
                        .put(url, params, this.config)
                        .then(function (data, status, headers, config) {
                            return data;
                        }).catch(function (data, status, headers, config) {
							throw { 'objeto' : data, 'status' : data.status };
                        });
                    return dados;
                },
                get: function (url) {
                    let dados = $http
                            .get(url, this.config)
                            .then(function (data, status, headers, config) {
                                return data;
                            }).catch(function (data, status, headers, config) {
								throw { 'objeto' : data, 'status' : data.status };
							});
                    return dados;
                }
            };
        }
	
		RestService.$inject = ['$http'];
})();