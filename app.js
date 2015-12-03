function QrResolver(){
    this.gCanvas = null;
    this.gCtx = null;
    this.video = null;
}
QrResolver.prototype = {
    initCanvas: function(width, height) {
	gCanvas = document.getElementById("qr-canvas");
	gCanvas.style.width = width + "px";
	gCanvas.style.height = height + "px";
	gCanvas.width = width;
	gCanvas.height = height;
	gCtx = gCanvas.getContext("2d");
	gCtx.clearRect(0, 0, width, height);
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
    decodeCallback: function(msg){
	alert(msg);
    },
    initWebCam: function(){
	navigator.mediaDevices.getUserMedia({audio: false, video: { width: 400, height: 400 }}).then(
	    function(mediaStream){
		console.log('success!');
		this.video = document.querySelector("#video");
		this.video.src = window.URL.createObjectURL(mediaStream);
		this.video.onloadedmetadata = function(e) {
		    this.video.play();
		}.bind(this);
		setInterval(this.captureToCanvas, 500);
	    }.bind(this)
	).catch(
	    function(error){
		console.log(error);
	    }
	)	
    }
}
window.addEventListener("load", function() {
    qr = new QrResolver();
    qr.initCanvas(400, 400);
    qrcode.callback = qr.decodeCallback;
    qr.initWebCam();
});
