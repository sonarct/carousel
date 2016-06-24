var	radius	= 300
,	angle	= 0
,	speed	= 0.005
,	amount	= 10

var myDrag		= new Drag(document)
,	myMomentum	= new Momentum
,	myDivs		= new Divificator(amount)
,	myDivs2		= new Divificator(amount)
,	myDivs3		= new Divificator(amount)



function animate() {
	myMomentum.push(myDrag.offset)
	myMomentum.update()
	if (myMomentum.active) {
		myDrag.offset.x = myMomentum.point.x
	}
	angle = myDrag.offset.x * speed
	for (var i = 0; i < amount; i++) {
		function setAngleOffset(myAngle) {
			return myAngle = myAngle * 2 * Math.PI
		}
		drawObject(myDivs.div[i] , setAngleOffset(i/amount), 0   )
		drawObject(myDivs2.div[i], setAngleOffset(i/amount), 150 )
		drawObject(myDivs3.div[i], setAngleOffset(i/amount), -150)
	}
	requestAnimationFrame(animate)
}


animate()


function drawObject(div, angleOffset, diffHeight) {
	var	x0 = 0
	,	y0 = 0
	,	z0 = 0

	var x = x0 - radius * Math.cos(angle + angleOffset)
	,	y = y0 + diffHeight
	,	z = z0 + radius * Math.sin(angle + angleOffset)

	var coordinates = [[x, y, z, 1]]
	var matrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]

	function MultiplyMatrix(A, B) {
		var rowsA = A.length, colsA = A[0].length
		,	rowsB = B.length, colsB = B[0].length
		,	C = []
		if (colsA != rowsB) return false
		for (var i = 0; i < rowsA; i++) C[i] = []
		for (var k = 0; k < colsB; k++) {
			for (var i = 0; i < rowsA; i++) {
				var t = 0
				for (var j = 0; j < rowsB; j++) {
					t += A[i][j] * B[j][k]
				}
				C[i][k] = t
			}
		}
		return C
	}

	var result = MultiplyMatrix(coordinates, matrix)
	var rad = (angle + angleOffset + Math.PI / 2) / 2

	var scale = Math.abs(Math.sin(rad))
	//scale = 1

	// if(scale < 0.4) scale = 0.4
	var opacity = Math.abs(Math.sin(rad))
	//if(opacity < 0.99) opacity = Math.pow(opacity, 3)
	//opacity = 1

	var dX = result[0][0] + window.innerWidth  / 2
	,	dZ = result[0][1] + window.innerHeight / 2

	div.style.zIndex = Math.round(result[0][1])
	div.style.transform = 'translate('+ dX +'px,'+ dZ +'px) scale('+ scale +')'
	div.style.opacity = opacity
}


myDrag.events.on('end', function() {
	myMomentum.push(myDrag.offset)
	myMomentum.start()
})


myDrag.events.on('drag', function() {
	myMomentum.stop()
})