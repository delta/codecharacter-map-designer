var numberOfRows; //determine the number of rows we want
var numberOfColumns; //determine the number of columns we want

var xStep; //determine the size of the gap between two points on the x axis
var yStep; //determine the size of the gap between two points on the y axis

var positions = []; //an array of positions where we will store each of our Vectors

var codecharmap = [];

var landColor, waterColor, goldColor;
var count;
let gold_bool = false;

function setup(){
	clear();
	numberOfColumns = + (document.getElementById("sizeRange").value);  
	numberOfRows = numberOfColumns;
	let myCanvas = createCanvas(numberOfRows * 30, numberOfColumns * 30);
	myCanvas.parent("mainDiv");
  	xStep = width / numberOfColumns;
	yStep = height / numberOfRows;
	codecharmap = [];
	positions = [];

	//Init Colors
	landColor = color(0, 200, 0);
	waterColor = color(0, 0, 200);
	goldColor = color(255, 200, 0);
  
  	for(var x = xStep / 2 ; x < width; x += xStep) { 
    	for(var y = yStep / 2; y < height; y += yStep) {
      		var p = createVector(x, y); //we create a vector at this location
      		positions.push(p); // and then we put the vector into the array
    	}
	}
	rectMode(CENTER);

	background(2);
	count = 0;
	for (var i = 0; i < numberOfRows; ++i) {
		let mapRow = [];
		for (var j = 0; j < numberOfColumns; ++j) {
			mapRow.push(1);
		}
		codecharmap.push(mapRow);
	}
	console.log(codecharmap);

	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[i][j] == 2 || codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] == 2) {
				fill(waterColor);
				codecharmap[i][j] = 2;
				codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] = 2;
			}
			else if (codecharmap[i][j] == 1 || codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] == 1) {
				fill(landColor);
				codecharmap[i][j] = 1;
				codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] = 1;
			}
			else if (codecharmap[i][j] == 0 || codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] == 0) {
				fill(goldColor);
				codecharmap[i][j] = 0;
				codecharmap[numberOfRows - 1 - i][numberOfColumns - 1 - j] = 0;
			}
			rect(positions[count].x, positions[count].y, xStep, yStep);
			count++;
    	}
	}

}

function mouseClicked() {
	let xIndex = int(mouseX / xStep);
	let yIndex = int(mouseY / yStep);
	if (gold_bool) {
		codecharmap[xIndex][yIndex]++;
		codecharmap[xIndex][yIndex] = codecharmap[xIndex][yIndex] % 3;
	} else {
		if (codecharmap[xIndex][yIndex] == 2 || codecharmap[xIndex][yIndex] == 0)
			codecharmap[xIndex][yIndex] = 1;
		else
			codecharmap[xIndex][yIndex] = 2;
	}
	codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = codecharmap[xIndex][yIndex];
	drawMap();
}

function mouseDragged() {
	let xIndex = int(mouseX / xStep);
	let yIndex = int(mouseY / yStep);
	codecharmap[xIndex][yIndex] = document.getElementById("terrain").value;
	codecharmap[numberOfRows - 1 - xIndex][numberOfColumns - 1 - yIndex] = codecharmap[xIndex][yIndex];
	drawMap();
	return false;
}

function drawMap() {
	count = 0;
	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[i][j] == 2) {
				fill(waterColor);
			}
			else if (codecharmap[i][j] == 1) {
				fill(landColor);
			}
			else if (codecharmap[i][j] == 0) {
				fill(goldColor);
			}
			rect(positions[count].x, positions[count].y, xStep, yStep);
			count++;
    	}
	}
}

function downloadMap() {
	currentMap = "";
	for(var i = 0; i < numberOfRows; ++i) { 
    	for(var j = 0; j < numberOfColumns; ++j) {
			if (codecharmap[j][i] == 2) {
				currentMap = currentMap + 'W ';
			}
			else if (codecharmap[j][i] == 1) {
				currentMap = currentMap + 'L ';
			}
			else if (codecharmap[j][i] == 0) {
				currentMap = currentMap + 'G ';
			}
		}
		currentMap += '\n';
	}
	let file = new Blob([currentMap], {type : "text/plain;charset=utf-8"});
	var a = document.createElement("a"), url = URL.createObjectURL(file);
	a.href = url;
	a.download = "example.txt";
	document.body.appendChild(a);
	a.click();
	setTimeout(function() {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);  
	}, 0);
}

function setSize(event) {
	document.getElementById("sizeText").innerHTML = event.target.value;
	setup();
}

function noGold(event) {
	if (gold_bool) {
		document.getElementById("boolGold").checked = false;
		gold_bool = false;
	} else {
		gold_bool = true;
		document.getElementById("boolGold").checked = true;
	}
}
