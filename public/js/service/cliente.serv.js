(function() {
	angular
		.module('atm-angular')
		.factory('ClienteService', ClienteService);

	function ClienteService(RestService) {
		
		let caminho = 'http://localhost:3000';
		
		return {
			getAll: function(){
				return RestService.get(caminho+'/clientes');
			},
			deposito: function(id, data){
				return RestService.put(caminho+'/deposito/'+id, data)
			},
			saque: function(id, data){
				return RestService.put(caminho+'/saque/'+id, data)
			}
		};
	};

	ClienteService.$inject = ['RestService'];
})();