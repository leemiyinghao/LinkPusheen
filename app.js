function LinkPusheen(){
    this.page = {};
    this.page.qrscaner = document.querySelector("#qrscaner");
    this.page.index = document.querySelector("#index");
    this.qrDiv = document.querySelector("#qrcode");
    this.scanerurl = document.querySelector("#scanerurl");
    this.qrdecoder = null;
    this.qrtag = null;
    this.socket = null;
    this.fromRequest = false;
    this.sceneOverlay = null;
};
LinkPusheen.prototype = {
    __init__: function(){
	this.addListeners();
	this.qrtag = new QRCode(this.qrDiv);
	this.socket = new Socket();
	this.socket.__init__(
	    ()=>{
		this.qrtag.makeCode(this.socket.socket.id);
	    },
	    (url)=>{
		window.open(url, "_self");
	    }
	);
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
    lunchQRScaner: function(url){
	url = url==null?prompt("url?"):url;
	this.resetUI();
	this.page.qrscaner.classList.remove("hidden");
	this.sceneCover = new SceneCover("sceneoverlay");
	this.sceneCover.setStyle();
	this.sceneCover.drawBorder();
	this.qrdecoder =  new QrResolver();
	qrcode.callback = function(msg){
	    this.socket.socket.emit("giveUrl", msg + "," + url);
	    clearInterval(this.qrdecoder.captureTask);
	    alert("done!");
	    if(this.fromRequest){
		window.close();
	    }else{
		this.lunchIndex();
	    };
	}.bind(this);
	this.qrdecoder.initWebCam();
	this.scanerurl.innerHTML = url;
    },
    handleEvent: function(event) {
	switch(event.type) {
	case "click":
	    console.log(event.target.id);
	    switch(event.target.id){
	    case "sendlink":
		this.lunchQRScaner();
		break;
	    case "closescaner":
		this.lunchIndex();
		break;
	    }
	    break;
	}
    },
    addListeners: function(){
	window.addEventListener("click", this, false);
    },
};
function Socket(){
    this.socket = null;
};
Socket.prototype = {
    __init__: function(onConnect, onGetUrl){
	this.socket = io("http://wugu.longcat.tw/");
	this.addListeners(onConnect, onGetUrl);
    },
    addListeners: function(onConnect, onGetUrl){
	this.socket.on('giveUrl', onGetUrl);
	this.socket.on('connect', onConnect);
    }
};
function SceneCover(id){
    this.canvas = document.getElementById(id);
    this.canvas.width = 300;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext("2d");
}
SceneCover.prototype = {
    drawBorder: function(){
	this.ctx.strokeRect(15,15,270,270);
	this.ctx.clearRect(0,60,300,180);
	this.ctx.clearRect(60,0,180,300);
    },
    setStyle: function(){
	this.ctx.lineWidth = 8;
	this.ctx.strokeStyle = "#666";
    }
}
linkPusheen = new LinkPusheen();
linkPusheen.__init__();
linkPusheen.lunchIndex();
if(screen.orientation != null){
    screen.orientation.lock('portrait-primary');
}
if(navigator.mozSetMessageHandler){
    navigator.mozSetMessageHandler('activity', function(activityRequest) {
	if(activityRequest.source.data.type == "url"){
	    linkPusheen.fromRequest = true;
	    linkPusheen.lunchQRScaner(activityRequest.source.data.url);
	}else{
	    return false;
	}
    });
}
