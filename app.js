function LinkPusheen(){
    this.page = {};
    this.page.qrscaner = document.querySelector("#qrscaner");
    this.page.index = document.querySelector("#index");
    this.qrdecoder = null;
    this.socket = null;
}
LinkPusheen.prototype = {
    __init__: function(){
	this.addListeners();
	if(screen.orientation)
	    screen.orientation.lock('portrait-primary');
    },
    resetUI: function(){
	for(index in this.page){
	    this.page[index].classList.add("hidden");
	}
    },
    lunchIndex: function(){
	this.resetUI();
	this.page.index.classList.remove("hidden");
    },
    lunchQRScaner: function(){
	this.resetUI();
	this.page.qrscaner.classList.remove("hidden");
	this.qrdecoder =  new QrResolver();
	this.qrdecoder.initCanvas(400, 400);
	qrcode.callback = function(msg){
	    this.socket.emit("giveUrl", msg+","+"http://ddg.gg/");
	}.bind(this);
	this.qrdecoder.initWebCam();
    },
    initSocket: function(){
	this.socket = io("http://wugu.longcat.tw/");
	this.socket.on('giveUrl', function(msg){
	    window.open(msg,"_self");
	});
	this.socket.on('connect', function(msg){
	    qrDiv = document.querySelector("#qrcode");
	    q = new QRCode(qrDiv, this.socket.id);
	}.bind(this));
    },
    handleEvent: function(event) {
	switch(event.type) {
	case "click":
	    if(event.target.id == "sendlink"){
		this.lunchQRScaner();
	    }
	}
    },
    addListeners: function(){
	window.addEventListener("click", this, false);
    },
};
linkPusheen = new LinkPusheen();
linkPusheen.__init__();
linkPusheen.initSocket();
linkPusheen.lunchIndex();
if(navigator.mozSetMessageHandler)
    navigator.mozSetMessageHandler('activity', function(activityRequest) {
	alert(activityRequest);
    });
