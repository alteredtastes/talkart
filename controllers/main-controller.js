(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("MainController", MainController);

  function MainController(Sketch) {
    var vm = this;
    vm.message = 'you are on the main controller';
  }

})();
