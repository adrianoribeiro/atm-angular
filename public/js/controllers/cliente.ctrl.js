(function () {
	angular
		.module('atm-angular')
		.controller('ClienteCtrl', ClienteCtrl);

	function ClienteCtrl($scope, $http, ClienteService) {
	
		$scope.clienteSel = undefined;
		$scope.valor = 0.00;
		
		$scope.errorMessage = undefined;
		$scope.successMessage = undefined;
		$scope.notas = [];
				
		$scope.realizarSaque = function(){
			$scope.errorMessage = undefined;
			$scope.successMessage = undefined;
			
			let data = {
				valor:$scope.valor
			}
			
			ClienteService.saque($scope.clienteSel._id, data)
			.then(function(response){
				$scope.successMessage = "Saque realizado com sucesso.";
				$scope.notas = response.data.data; //Verificar.
				$scope.clienteSel.saldo = parseFloat($scope.clienteSel.saldo) - parseFloat($scope.valor);
			})
			.catch(function(error){
				$scope.errorMessage = error.objeto.data;
				console.log(error);
			});
		}
		
		$scope.realizarDeposito = function(){
			$scope.errorMessage = undefined;
			$scope.successMessage = undefined;

			let data = {
				valor:$scope.valor
			}
			
			ClienteService.deposito($scope.clienteSel._id, data)
			.then(function(response){
				$scope.successMessage = "Depósito realizado com sucesso.";
				$scope.clienteSel.saldo = parseFloat($scope.valor) + parseFloat($scope.clienteSel.saldo);
				console.log(response);
			})
			.error(function(error){
				console.log(error);
			});
		}
		
		var getAll = function(){

			ClienteService.getAll()
				.then(function(response){
					$scope.clientes = response.data;
				})
				.catch(function(error){
					console.log(error);
				});
		}
		
		//TODO: Passar para o serviço
		var getById = function(_id){
			$http.get('http://localhost:3000/clientes/'+_id)
			.then(function(response){
				return response.saldo;
			})
			.catch(function(error){
				console.log(error);
				return undefined;
			});
		}
				
		var init = function(){
			
			getAll();
		}
		
		init();
	};

	ClienteCtrl.$inject = ['$scope', '$http', 'ClienteService'];
})();