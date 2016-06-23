var	x0 		= window.innerWidth / 2
,	y0 		= window.innerHeight / 2
,	radiusX = 300
,	radiusY = 50
,	angle 	= 0
,	speed	= 0.005
,	amount  = 200

var myDrag 		= new Drag(document)
,	myMomentum 	= new Momentum
,	myDivs 		= new Divificator(amount);


function animate() {
	myMomentum.push(myDrag.offset)
	myMomentum.update()
	if (myMomentum.active) {
		myDrag.offset.x = myMomentum.point.x
	}
	calculateAngle()
	for (var i = 0; i < amount; i++) {
		drawObject(myDivs.div[i], angleOffset(i / amount))
	}
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
	if(opacity < 0.99) opacity = Math.pow(opacity, 3)

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


