var	x0 = 400,
	y0 = 300,
	radiusX = 300,
	radiusY = 100,
	angle = 1,
	offsetX = 0,
	offsetY = 0,
	speed = 200;


var div1 = document.getElementById('div1');
var div2 = document.getElementById('div2');
var div3 = document.getElementById('div3');
var div4 = document.getElementById('div4');
var div5 = document.getElementById('div5');
var div6 = document.getElementById('div6');
var div7 = document.getElementById('div7');
var div8 = document.getElementById('div8');
var div9 = document.getElementById('div9');
var div10 = document.getElementById('div10');

var debug = document.getElementById('debug');



function animate() {
	drawObject(div1, 1.0,  1.0, 0);
	drawObject(div2, 1.3, 1.2, 90);
	drawObject(div3, 0.7,  0.8, 180);

	requestAnimationFrame(animate);
};


animate();


function showDebugInfo() {
	//debug.innerHTML = x + '<br>' + y + '<br>' + scale + '<br>' + opacity + '<br>';
};


function drawObject(div, perspectiveX, perspectiveY, angleOffset) {

	var x = x0 + perspectiveX * radiusX * Math.cos(angle + angleOffset);
	var y = y0 + perspectiveY * radiusY * Math.sin(angle + angleOffset);

	var scale = Math.abs(Math.sin((angle + angleOffset + Math.PI/2)/2));
	var opacity = Math.abs(Math.sin((angle + angleOffset + Math.PI/2)/2));


	div.style.zIndex = Math.round(x);
	div.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
	div.style.opacity = opacity;
};


window.addEventListener('mousemove', function(e) {
	angle = - e.clientX / 50;
})