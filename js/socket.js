function Socket(){
    this.socket = null;
};
Socket.prototype = {
    __init__: function(onConnect, onGetUrl){
	this.socket = io("http://linkpusheen.longcat.tw/");
	this.addListeners(onConnect, onGetUrl);
    },
    addListeners: function(onConnect, onGetUrl){
	this.socket.on('giveUrl', onGetUrl);
	this.socket.on('connect', onConnect);
    }
};
