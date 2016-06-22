var	x0 = window.innerWidth / 2
,	y0 = window.innerHeight / 2
,	radiusX = 300
,	radiusY = 50
,	angle 	= 0
,	speed	= 0.005

var dAngle 	= 0
,	div 	= []
,	myDrag 	= new Drag(document)
,	myMomentum = new Momentum


for (var i = 0; i < 10; i++) {
	div[i]			 = document.createElement('div')
	div[i].id		 = 'div' + i
	div[i].className = 'round'
	div[i].innerHTML = i
	document.body.appendChild(div[i])
}


function animate() {
	
	myMomentum.push(myDrag.offset)
	myMomentum.update()
	if (myMomentum.active) {
		myDrag.offset.x = myMomentum.point.x
	}
	calculateAngle()
	drawObject(div[9], angleOffset(0)   , 0)
	drawObject(div[8], angleOffset(1/10), -150)
	drawObject(div[7], angleOffset(2/10), 0)
	drawObject(div[6], angleOffset(3/10), 150)
	drawObject(div[5], angleOffset(4/10), 0)
	drawObject(div[4], angleOffset(5/10), -150)
	drawObject(div[3], angleOffset(6/10), 0)
	drawObject(div[2], angleOffset(7/10), 150)
	drawObject(div[1], angleOffset(8/10), 0)
	drawObject(div[0], angleOffset(9/10), -150)
	requestAnimationFrame(animate)
}


animate()


function drawObject(div, angleOffset, diffHeight) {
	x0 = window.innerWidth / 2
	y0 = window.innerHeight / 2
	z0 = 0

	var x = x0 - radiusX * Math.cos(angle + angleOffset)
	,	y = y0 + radiusY * Math.sin(angle + angleOffset)
	,	z = z0 + diffHeight

	var scale = Math.abs(Math.sin((angle + angleOffset + Math.PI / 2) / 2))
	if(scale < 0.4) scale = 0.4
	var opacity = Math.abs(Math.sin((angle + angleOffset + Math.PI / 2) / 2))
	if(opacity < 0.99) opacity = opacity * opacity * opacity

	div.style.zIndex = Math.round(y)
	div.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')'
	div.style.opacity = opacity
}


function calculateAngle() {
	angle = myDrag.offset.x * speed
}


function angleOffset(myAngle) {
	return myAngle = myAngle * 2 * Math.PI
}


myDrag.events.on('end', function() {
	myMomentum.push(myDrag.offset)
	myMomentum.start()
})


myDrag.events.on('drag', function() {
	myMomentum.stop()
})