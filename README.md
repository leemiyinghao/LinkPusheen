# LinkPusheen

LinkPusheen is a Tools for user to push URLs from Camera-carry devices like Smart phones, Tablets, or some Laptops.

This work by open LinkPusheen on both of the device, and scanning a special QRCode tag which LinkPusheen provided.

![Example Image](http://i.imgur.com/8ftt6QH.png)

## Live Demo

<http://linkpusheen.longcat.tw>

## Code Usage

LinkPusheen client is workable as both Firefox OS App and Webpage with no modify needed.

Also, server-side code is open-sourced for every one to build their own server.

<https://github.com/leemiyinghao/LinkPusheen_Server>

## Known Bugs

- Chrome/Webkit Browswers cannot open camera to scan QRCode due to their getUserMedia and https policy
- On Firefox of some Smart-phones, QRCode scanning will fail due to the wrong direction of camera image
- In some situation, anonymous can push URLs without authorization 
