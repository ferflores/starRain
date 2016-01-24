(function(){

  var socket = null;
  var canvas = null
  var dataModel = null;
  var drawer = null;

  var events = {
    configure: function(config){
      socket = config.socket;
      canvas = config.canvas;
      dataModel = config.dataModel;
      drawer = config.drawer;
    },

    addClickRoomHandler: function(item){
      var elm = $('#'+item);

      elm.unbind('click');

      elm.on('click', function(){
        drawer.restart(item);
        dataModel.project = item;
        dataModel.results = [];
        socket.emit('click-room', item);
      });
    }
  }

  module.exports = events;

})();
