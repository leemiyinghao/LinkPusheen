var socket = io("http://wugu.longcat.tw/");
socket.on('giveUrl', function(msg){
    window.open(msg,"_self");
});
socket.on('connect', function(msg){
console.log(socket);
    qrDiv = document.querySelector("#qrcode");
    q = new QRCode(qrDiv, socket.id);
    console.log(socket.id);
});
qrscaner = document.querySelector("#qrscaner");
index = document.querySelector("#index");
document.querySelector("a#sendlink").onclick = () => {
    index.classList.add("hidden");
    qrscaner.classList.remove("hidden");
    qr = new QrResolver();
    qr.initCanvas(400, 400);
    qrcode.callback = function(msg){
	socket.emit("giveUrl", msg+","+"http://ddg.gg/");
    };
    qr.initWebCam();
};
qrscaner.classList.add("hidden");
screen.orientation.lock('portrait-primary');
navigator.mozSetMessageHandler('activity', function(activityRequest) {
    alert(activityRequest);
});
