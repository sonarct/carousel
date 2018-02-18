import Drag from '../lib/Drag'
import Momentum from '../lib/Momentum'
import Divificator from '../lib/Divificator'

var	radius	= 500
,	angle	= 0
,	speed	= 0.005
,	amount	= 20

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


		drawObject(myDivs.div[i] , setAngleOffset(i/amount), 0, i === 0)
		drawObject(myDivs2.div[i], setAngleOffset(i/amount), 400)
		drawObject(myDivs3.div[i], setAngleOffset(i/amount), -400)
	}
	requestAnimationFrame(animate)
}


animate()


function drawObject(div, angleOffset, diffHeight, flag) {


	var x = -radius * Math.cos(angle + angleOffset)
	,	y = diffHeight
	,	z = radius * Math.sin(angle + angleOffset)


	var coordinates = [[x, y, z, 1]]

	var matrix =[[1.0,	0.0,	0.0,	0.000],
				 [0.0,	1.0,	0.0,	0.0],
				 [0.0,	0.0,	1.0,	-0.0009],
				 [0.0,	0.0,	0.0,	2]]

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

	var perspective = []
	for (var g = 0; g < 4; g++) {
		perspective[g] = result[0][g] / result[0][3]
	}
	perspective[3] = result[0][3]

	var rad = (angle + angleOffset + Math.PI / 2) / 2

	var scale = z / radius / 3 + 0.5

	var opacity = z / radius / 2 + 0.4

	var dX = perspective[0] + window.innerWidth  / 2
	,	dY = perspective[1] + window.innerHeight / 2
	//div.textContent = Math.round(opacity*100)/100
	div.style.zIndex = z + 500
	div.style.transform = 'translate('+ dX +'px,'+ dY +'px) scale('+ scale +')'
	div.style.opacity = opacity
}


myDrag.events.on('end', function() {
	myMomentum.push(myDrag.offset)
	myMomentum.start()
})


myDrag.events.on('drag', function() {
	myMomentum.stop()
})