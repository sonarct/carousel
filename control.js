var	x0 		= window.innerWidth / 2
,	y0 		= window.innerHeight / 2
,	radiusX = 300
,	radiusY = 50
,	angle 	= 0
,	speed	= 0.005
,	amount  = 20

var myDrag 		= new Drag(document)
,	myMomentum 	= new Momentum
,	myDivs 		= new Divificator(amount);

var result

function animate() {
	myMomentum.push(myDrag.offset)
	myMomentum.update()
	if (myMomentum.active) {
		myDrag.offset.x = myMomentum.point.x
	}
	calculateAngle()
	for (var i = 0; i < amount; i++) {
		drawObject(myDivs.div[i], angleOffset(i / amount), 1)
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

	var coordinates = [[x, y, z, 1]]

	var matrix = [[1,1,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1]]

	result = MultiplyMatrix(coordinates, matrix)



	var scale = Math.abs(Math.sin((angle + angleOffset + Math.PI / 2) / 2))
	if(scale < 0.4) scale = 0.4
	var opacity = Math.abs(Math.sin((angle + angleOffset + Math.PI / 2) / 2))
	if(opacity < 0.99) opacity = Math.pow(opacity, 3)

	div.style.zIndex = Math.round(result[0][1])
	div.style.transform = 'translate(' + result[0][0] + 'px,' + result[0][1] + 'px) scale(' + scale + ')'
	div.style.opacity = opacity
}


function MultiplyMatrix(A,B) {
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];

    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
          C[i][k] = t;
        }
     }
    return C;
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



// var coordinates = [[3, 3, 3, 1]]

// 	var matrix = [[1,0,0,0],[0,0,0,0],[0,0,1,0],[0,0,0,1]]

// var xxx =	MultiplyMatrix(coordinates, matrix)