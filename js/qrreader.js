function QrResolver(){
    this.gCanvas = null;
    this.gCtx = null;
    this.video = null;
    this.captureTask = null;
}
QrResolver.prototype = {
    initCanvas: function(width, height) {
	console.log(width, height);
	this.gCanvas = document.getElementById("qr-canvas");
	this.gCanvas.style.width = width + "px";
	this.gCanvas.style.height = height + "px";
	this.gCanvas.width = width;
	this.gCanvas.height = height;
	this.gCtx = this.gCanvas.getContext("2d");
	this.gCtx.clearRect(0, 0, width, height);
    },
    captureToCanvas: function(){
	try {
	    this.gCtx.drawImage(this.video, 0, 0); //print screen on video, and paste onto gCanvas
	    try{
		qrcode.decode();
	    } catch (error) {
		console.log(error);
	    }
	} catch (error) {
	    console.log(error);
	}
    },
    onWebCamSucess: function(mediaStream){
	console.log('success!');
	this.video.src = window.URL.createObjectURL(mediaStream);
	this.video.onloadedmetadata = function(e) {
	    this.initCanvas(this.video.videoWidth, this.video.videoHeight);
	}.bind(this);
	this.captureTask = setInterval(this.captureToCanvas.bind(this), 200);
    },
    onWebCamFail: function(error){
	console.log(error);
    }.bind(this),
    initWebCam: function(){
	this.video = document.querySelector("#video");
	navigator.mediaDevices.getUserMedia({audio: false, video: {width: 1280, length: 720}}).then(this.onWebCamSucess.bind(this), this.onWebCamFail);
    }
};
