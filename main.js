/**
 * Place your JS-code here.
 */
$(document).ready(function(){
  'use strict';

var firstTime = true,
nrOfRooms = 10,

bestResult, nrOfGold, 
// to keep game going
start, gameGoing, count,
// canvas
canvas, ctx,
// Background image
bgReady, bgImage, roomSetting, currBG, topImg, bottomImg, leftImg, rightImg,
// Player image
playerReady, playerImage, swordImage, attackEnemy,
// Enemy image
enemyReady, enemyImage,
// nrOfEnemy, enemies (array av enemy), sortOfEnemy,
enemies, 
// gold Image
goldReady, goldImage,		
// Barrier image
barriersReady, barriersImage, 
// nrOfBarriers

// xy = gameBoard, gameBoards = array of xy
XY, 

// objects and array
bg, player, barrier, directionPlayer, curDirectionPlayer,  enemyDir, gold,

// functions
initCanvas, initObjectsAndArray, initImages, initKeyHandler, 

// functions in going Game
restart, update, render, gameOver, main,

// keyhandler
keysDown;


initCanvas = function(){
	canvas = document.getElementById("can");
	ctx = canvas.getContext("2d");
	canvas.width = 480;
	canvas.height = 320;
};
initObjectsAndArray = function() {
	
	// Game objects
	XY = {};
	for (var q = 0 ; q < nrOfRooms ; q++ )
	{
		XY[q] = {};
		for ( var a = 0; a <= 11 ; a++ )
		{
			XY[q][a] = {};
			for ( var b = 0 ; b <= 6 ; b++)
			{
				XY[q][a][b] = {
					taken: false,
					width: 32,
					height: 32,
					x: (50 + 32 * a),
					y: (50 + 32 * b),
				}
			}
		}
	}
	gold = {
		width: 28,
		height: 28,
	}
	bg = {
		boxWidth: 32,
		width: 	480,
		height: 320,
		edgeDist: 50,
	}
	player = {
		speed: 32,
		width: 28,
		height: 28,
	};
	roomSetting = [];
	roomSetting[0] = { top:true,  left:false, bottom:false, right:false, nrOfBarriers: 10, enemyType: 1, nrOfEnemy: 2, enemyHealth: 1 };
	roomSetting[1] = { top:false, left:false, bottom:true,  right:true,  nrOfBarriers: 10, enemyType: 2, nrOfEnemy: 5, enemyHealth: 2 };
	roomSetting[2] = { top:false, left:true,  bottom:false, right:true,  nrOfBarriers: 10, enemyType: 3, nrOfEnemy: 3, enemyHealth: 3 };
	roomSetting[3] = { top:true,  left:true,  bottom:false, right:false, nrOfBarriers: 10, enemyType: 1, nrOfEnemy: 7, enemyHealth: 1 };
	roomSetting[4] = { top:true,  left:false, bottom:true,  right:false, nrOfBarriers: 10, enemyType: 2, nrOfEnemy: 7, enemyHealth: 2 };
	roomSetting[5] = { top:false, left:false, bottom:true,  right:true,  nrOfBarriers: 10, enemyType: 3, nrOfEnemy: 2, enemyHealth: 3 };
	roomSetting[6] = { top:false, left:true,  bottom:false, right:true,  nrOfBarriers: 10, enemyType: 1, nrOfEnemy: 6, enemyHealth: 1 };
	roomSetting[7] = { top:false, left:true,  bottom:false, right:true,  nrOfBarriers: 10, enemyType: 2, nrOfEnemy: 4, enemyHealth: 2 };
	roomSetting[8] = { top:true,  left:true,  bottom:false, right:false, nrOfBarriers: 10, enemyType: 3, nrOfEnemy: 2, enemyHealth: 3 };
	roomSetting[9] = { top:false, left:false, bottom:true,  right:false, nrOfBarriers: 10, enemyType: 3, nrOfEnemy: 7, enemyHealth: 3 };
	
	barrier = {};
	enemies = {};
	for ( var a = 0 ; a < nrOfRooms ; a++ )
	{
		barrier[a] = {};
		for ( var i = 0 ; i < roomSetting[a].nrOfBarriers ; i++ )
		{	
			barrier[a][i] = {
			height: 32,
			width: 32, 
			};
		}
		enemies[a] = {};
		for ( var i = 0; i < roomSetting[a].nrOfEnemy ; i++ )
		{
			enemies[a][i] = {
				width: 28,
				height: 28,
				speed: 32,
				health: roomSetting[a].enemyHealth,
			}
		}
		var x, y;
		for ( var i = 0 ; i < roomSetting[a].nrOfBarriers ; i++ )
		{
			do {
			x = Svidde.random(1, 12);
			y = Svidde.random(1, 7);
			} while (  XY[a][x][y].taken || 
				x == 0  && y == 3 ||
				x == 11 && y == 3 ||
				x == 5  && y == 0 || 
				x == 6  && y == 0 ||  
				x == 5  && y == 6 ||
				x == 6  && y == 6 );
			XY[a][x][y].taken = true;
			barrier[a][i].x = bg.edgeDist + x * bg.boxWidth;
			barrier[a][i].y = bg.edgeDist + y * bg.boxWidth;
		}
	}
	// different img based on direction on player
	directionPlayer = {
		left: "img/linkA.gif",
		right: "img/linkD.gif",
		up: "img/linkW.gif",
		down: "img/linkS.gif",
	};
	// direction for monster 0 => up, 1 => down, 2 => left, 3 => right
	enemyDir  = [ 0 , 1 , 2 , 3 ];
}
initImages = function() {
	// background
	bgReady = false;
	bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "img/bg.jpg";
	
	topImg = new Image();
	topImg.src = "img/top.png";
	bottomImg = new Image();
	bottomImg.src = "img/bottom.png";
	leftImg = new Image();
	leftImg.src = "img/left.png";
	rightImg = new Image();
	rightImg.src = "img/right.png";
	
	// player
	playerReady = false;
	playerImage = new Image();
	playerImage.onload = function () {
		playerReady = true;
	};
	playerImage.src = directionPlayer.down;
	
	swordImage = new Image();
	curDirectionPlayer = "s";
	
	//enemy
	enemyReady = false;
	enemyImage = {};
	for (var i = 1 ; i <= 3 ; i++)
	{
		enemyImage[i] = new Image();
	}
	enemyImage[1].onload = function () {
		enemyReady = true;
	};
	for (var i = 1 ; i <= 3 ; i++)
	{
		enemyImage[i].src = "img/Enemy_"+i+".png";
	}
	
	// barrier
	barriersReady = false;
	barriersImage = new Image();
	barriersImage.onload = function () {
		barriersReady = true;
	};
	barriersImage.src = "img/barrier.jpg";
	
	// gold
	goldReady = false;
	goldImage = new Image();
	goldImage.onload = function () {
		goldReady = true;
	};
	goldImage.src = "img/gold.gif";
	
}

initKeyHandler = function(){
	// Handle keyboard controls
	keysDown = {};
	
	
	addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	//console.log("pX: "+player.X + " pY: "+ player.Y);
	//console.log("px: "+player.x + " py: "+ player.y);
	}, false);
}

// Reset the game when the player catches a gold
restart = function (position) {
	
	var x, y;
	if (start == 1){
		// place player in left top corner
		currBG = 0;
		player.x = bg.edgeDist;
		player.y = bg.edgeDist;;
		player.X = 0;
		player.Y = 0;
		
		nrOfGold = 0;
		for ( var i = 0 ; i < nrOfRooms ; i++ )
		{
			for (var j = 0 ; j < roomSetting[i].nrOfEnemy; j++ )
			{
				enemies[i][j].health = roomSetting[i].enemyHealth;
			}
		}
		// Throw the ENEMY somewhere on the screen randomly
		for ( var a = 0 ; a < nrOfRooms ; a++ )
		{
			for (var i = 0 ; i < roomSetting[a].nrOfEnemy ; i++)
			{
				do {
					x = Svidde.random(2, 12);
					y = Svidde.random(2, 7);
				} while ( XY[currBG][x][y].taken || 
					// topdoor
					x == 5 && y == 0 ||
					x == 6 && y == 0 ||
					x == 4 && y == 0 ||
					x == 7 && y == 0 ||
					x == 5 && y == 1 ||
					x == 6 && y == 1 ||
					// rightdoor
					x == 11 && y == 3 ||
					x == 11 && y == 2 ||
					x == 11 && y == 4 ||
					x == 10 && y == 3 ||
					// bottomdoor
					x == 5 && y == 6 ||
					x == 6 && y == 6 ||
					x == 4 && y == 6 ||
					x == 7 && y == 6 ||
					x == 5 && y == 5 ||
					x == 6 && y == 5 ||
					// leftdoor
					x == 0 && y == 3 ||  
					x == 0 && y == 2 ||  
					x == 0 && y == 4 ||  
					x == 1 && y == 3 
					
					);
				enemies[a][i].X = x;
				enemies[a][i].Y = y;
				enemies[a][i].x = bg.edgeDist + x * bg.boxWidth;
				enemies[a][i].y = bg.edgeDist + y * bg.boxWidth;
			}
		}
	}
	if (start == 1 || start == 2){
		start = 0;
		gameGoing = true;
		var c; 
		for ( var a = 0 ; a < nrOfRooms ; a++ )
		{
			c = 0;
			for ( var b = 0 ; b < roomSetting[a].nrOfEnemy ; b ++ )
			{
				if ( enemies[a][b].health <= 0 )
				{
					c++;
				}
			}
			if ( c == roomSetting[a].nrOfEnemy )
			{
				for ( var b = 0 ; b < roomSetting[a].nrOfEnemy ; b ++ )
				{
					enemies[a][b].health = roomSetting[a].enemyHealth;
				}
			}
		}
	}
	
	
	
	// Throw the GOAL somewhere on the screen randomly
	do {
		x = Svidde.random(1, 11);
		y = Svidde.random(1, 6);
		} while ( XY[currBG][x][y].taken || 
				XY[currBG][x+1][y].taken && XY[currBG][x-1][y].taken && XY[currBG][x][y+1].taken && XY[currBG][x][y-1].taken );
		gold.X = x;
		gold.Y = y;
		gold.x = bg.edgeDist + x * bg.boxWidth;
		gold.y = bg.edgeDist + y * bg.boxWidth;
	}
	
	




var initGame  = function(){
	if ( firstTime ) {
		currBG = 0;
		bestResult = 0;
		firstTime = false;
		start = 1;		// just place out player first time.
		gameGoing = false;	// while gameGoing not gameOver
		count = 0;		// to only move enemy sometimes
		
		initCanvas();
		document.getElementById('songTheme').play();
		initObjectsAndArray();
		initImages();
		initKeyHandler();
		restart();
	}
	else { 
		start = 1;
		document.getElementById('songTheme').play();
		restart();
		bgReady = true;
		playerReady = true;
		enemyReady = true;
	}
}




// Update game objects
update = function () {
	
	
	if ( gameGoing )
	{
		count++;	
		if (38 in keysDown) { // Player holding up
			playerImage.src = directionPlayer.up;
			curDirectionPlayer = "w";
			if ( player.Y-1 > -1 )
			{
				if ( !XY[currBG][player.X][player.Y-1].taken )
				{
					if (player.y - player.speed  < player.Y*32 + 32)
					{
						player.Y--;
					}
					if ( player.y - player.speed  >= 0 + bg.edgeDist) {
						player.y -= player.speed;
					}
				}
			}
			if ( roomSetting[currBG].top &&  player.Y == 0 )
			{
				if ( player.X == 5 || player.X == 6 )
				{
					currBG++;
					start = 2;
					player.Y = 6;
					player.y =  bg.edgeDist + 32 *  player.Y;
					restart();
				}	
			}
		}
		if (40 in keysDown) { // Player holding down
			curDirectionPlayer = "s";
			playerImage.src = directionPlayer.down;
			if ( player.Y+1 < 7 )
			{
				if ( !XY[currBG][player.X][player.Y+1].taken )
				{
					if (player.y + player.speed + player.height - bg.edgeDist > player.Y*32 + 32)
					{
						player.Y++;
					}
					if ( player.y + player.speed <=  bg.height - player.height - bg.edgeDist ){
						player.y += player.speed;
					}
				}
			}
			if ( roomSetting[currBG].bottom &&  player.Y == 6 )
			{
				if ( player.X == 5 || player.X == 6 )
				{
					currBG--;
					start = 2;
					player.Y = 0;
					player.y =  bg.edgeDist;
					restart();
				}	
			}
		}
		if (37 in keysDown) { // Player holding left
			curDirectionPlayer = "a";
			playerImage.src = directionPlayer.left;
			if ( player.X-1 > -1 )
			{
				if ( !XY[currBG][player.X-1][player.Y].taken )
				{
					if (player.x - player.speed  < player.X*32 + 32)
					{
						player.X--;
					}
					if ( player.x - player.speed >= 0 + bg.edgeDist){
						player.x -= player.speed;
					}
				}
			}
			if ( roomSetting[currBG].left && player.Y == 3 && player.X == 0)
			{
				currBG--;
				start = 2;
				player.X = 11;
				player.x = bg.edgeDist + player.X * 32;
				restart();
			}
		}
		if (39 in keysDown) { // Player holding right
			curDirectionPlayer = "d";
			playerImage.src = directionPlayer.right;
			if ( player.X+1 < 12 )
			{
				if ( !XY[currBG][player.X+1][player.Y].taken )
				{
					if (player.x + player.speed + player.width - bg.edgeDist > player.X*32 + 32)
					{
						player.X++;
					}
					if ( player.x + player.speed <= bg.width - player.width  - bg.edgeDist){
						player.x += player.speed;
					}
				}
			}
			if ( roomSetting[currBG].right && player.Y == 3 && player.X == 11)
			{
				currBG++;
				start = 2;
				player.X = 0;
				player.x = bg.edgeDist + player.X * 32;
				restart();
			}
		}
		if (32 in keysDown) {
				
		}
		
		// enemy moving
		if ( count >= 5 ){
		for (var i = 0 ; i < roomSetting[currBG].nrOfEnemy ; i++ )
		{
			var enemyDir = Svidde.random( 0, 4 );
			switch (enemyDir) {
			case 0:	// up
				if (enemies[currBG][i].y - enemies[currBG][i].speed >= 0 + bg.edgeDist)
				{	
					if ( ! XY[currBG][enemies[currBG][i].X][enemies[currBG][i].Y - 1].taken )
					{
						enemies[currBG][i].y -= enemies[currBG][i].speed;
						enemies[currBG][i].Y--;
					}
				}
				break;
			case 1:	// down
				if (enemies[currBG][i].y + enemies[currBG][i].speed <= bg.height - enemies[currBG][i].height - bg.edgeDist)
				{
					if ( !XY[currBG][enemies[currBG][i].X][enemies[currBG][i].Y + 1].taken )
					{
						enemies[currBG][i].y += enemies[currBG][i].speed;
						enemies[currBG][i].Y++;
					}
				}
				break;
			case 2:	// left
				if (enemies[currBG][i].x - enemies[currBG][i].speed >= 0 + bg.edgeDist)
				{
					if ( !XY[currBG][enemies[currBG][i].X - 1][enemies[currBG][i].Y].taken )
					{
						enemies[currBG][i].x -= enemies[currBG][i].speed;
						enemies[currBG][i].X--;
					}
				}
				break;
			case 3:	// right
				if (enemies[currBG][i].x + enemies[currBG][i].speed <= bg.width - enemies[currBG][i].width  - bg.edgeDist)
				{
					if ( !XY[currBG][enemies[currBG][i].X + 1][enemies[currBG][i].Y].taken)
					{
						enemies[currBG][i].x += enemies[currBG][i].speed;
						enemies[currBG][i].X++;
					}
				}
				break;
			default:
				break;
			}
		
		}
		count = 0;
		}
	
		
		// Enemy vs Player
		for ( var i = 0 ; i < roomSetting[currBG].nrOfEnemy ; i++)
		{
			if (enemies[currBG][i].health > 0)
			{
				if (
					player.x <= (enemies[currBG][i].x + player.width) && 
					enemies[currBG][i].x <= (player.x + enemies[currBG][i].width) && 
					player.y <= (enemies[currBG][i].y + player.height) && 
					enemies[currBG][i].y <= (player.y + enemies[currBG][i].height)
				) {
					 gameOver();
				}
			}
		}
		
		// Player vs Gold
		var c = 0;
		for ( var b = 0 ; b < roomSetting[currBG].nrOfEnemy ; b ++ )
		{
			if ( enemies[currBG][b].health <= 0 )
			{
				c++;
			}
		}
		if ( c != roomSetting[currBG].nrOfEnemy )
		{
			if (
				player.x <= (gold.x + player.width) && 
				gold.x <= (player.x + gold.width) && 
				player.y <= (gold.y + player.height) && 
				gold.y <= (player.y + gold.height)
			) {
				nrOfGold++;
				restart();
			}
		}
		// Ememy vs Gold
		for ( var i = 0 ; i < roomSetting[currBG].nrOfEnemy ; i++)
		{
			var c = 0;
			for ( var b = 0 ; b < roomSetting[currBG].nrOfEnemy ; b ++ )
			{
				if ( enemies[currBG][b].health <= 0 )
				{
					c++;
				}
			}
			if ( c != roomSetting[currBG].nrOfEnemy )
			{
				if (enemies[currBG][i].health > 0)
				{
					if (
						enemies[currBG][i].x <= (gold.x + enemies[currBG][i].width) && 
						gold.x <= (enemies[currBG][i].x + gold.width) && 
						enemies[currBG][i].y <= (gold.y + enemies[currBG][i].height) && 
						gold.y <= (enemies[currBG][i].y + gold.height)
					) {
						nrOfGold--;
						restart();
					}
				}
			}
		}
		
		
		
	}
	else {
		if (13 in keysDown) { // Player holding enter
			initGame();	
			gameGoing = true;
		}
	}
};

attackEnemy = function (swordX, swordY) {
	for ( var i = 0 ; i < roomSetting[currBG].nrOfEnemy ; i++)
	{
		console.log("x: " + swordX + " : " + swordY);
		if (enemies[currBG][i].health > 0)
		{
			if (swordY == 32)
			{
				if ( 	player.x+28 <= (enemies[currBG][i].x + player.width) && 
					enemies[currBG][i].x <= (player.x + bg.boxWidth) && 
					player.y <= (enemies[currBG][i].y + bg.boxWidth) && 
					enemies[currBG][i].y <= (player.y + bg.boxWidth)	
				){
					enemies[currBG][i].health--;
				}
			}
			else if (swordX == 32)
			{
				if ( 	player.x <= (enemies[currBG][i].x + player.width) && 
					enemies[currBG][i].x <= (player.x + bg.boxWidth) && 
					player.y+28 <= (enemies[currBG][i].y + bg.boxWidth) && 
					enemies[currBG][i].y <= (player.y + bg.boxWidth)	
				){
					enemies[currBG][i].health--;
				}
			}
			else 
			{
				if ( 	player.x+swordX <= (enemies[currBG][i].x + player.width) && 
					enemies[currBG][i].x <= (player.x + enemies[currBG][i].width) && 
					player.y+swordY <= (enemies[currBG][i].y + player.height) && 
					enemies[currBG][i].y <= (player.y + enemies[currBG][i].height)	
				){
					enemies[currBG][i].health--;
				}
			}
		}
		console.log("health: "+enemies[currBG][i].health);
		
	}
}

// Draw everything
render = function () {
	
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
		if ( roomSetting[currBG].top )
		{
			ctx.drawImage(topImg, 0, 0);
		}
		if ( roomSetting[currBG].bottom )
		{
			ctx.drawImage(bottomImg, 0, 0);
		}
		if( roomSetting[currBG].left )
		{
			ctx.drawImage(leftImg, 0, 0);
		}
		if( roomSetting[currBG].right )
		{
			ctx.drawImage(rightImg, 0, 0);
		}
	}

	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y);
	}

	if (enemyReady) {
		for ( var i = 0 ; i < roomSetting[currBG].nrOfEnemy ; i++)
		{
			if ( enemies[currBG][i].health > 0 )
			ctx.drawImage(enemyImage[roomSetting[currBG].enemyType], enemies[currBG][i].x, enemies[currBG][i].y);
		}
	}
	
	if (barriersReady){
		for ( var i = 0 ; i < roomSetting[currBG].nrOfBarriers ; i++)
		{
			ctx.drawImage( barriersImage, barrier[currBG][i].x, barrier[currBG][i].y);	
		}
	}
	
	if (goldReady) {
		var c = 0;
		for ( var b = 0 ; b < roomSetting[currBG].nrOfEnemy ; b ++ )
		{
			if ( enemies[currBG][b].health <= 0 )
			{
				c++;
			}
		}
		if ( c != roomSetting[currBG].nrOfEnemy )
		{
			ctx.drawImage(goldImage, gold.x, gold.y);
		}
		ctx.fillStyle = "red";
		ctx.font = "20px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		if ( nrOfGold < 10 && nrOfGold > -1)
			ctx.fillText("" + nrOfGold + " Gold", bg.width/2 - 30 , 50 + 7*32 + 15);
		else
			ctx.fillText("" + nrOfGold + " Gold", bg.width/2 - 37 , 50 + 7*32 + 15);
		
		ctx.fillText(" Score: "+ bestResult, bg.width - 32*4, 50 + 7*32 + 15 );
	}
	
	if (32 in keysDown) {
				console.log(": " + curDirectionPlayer);
			switch ( curDirectionPlayer )
			{
			case "w": 
				swordImage.src = "img/sword_w.png";
				if ( player.Y > 0 && !XY[currBG][player.X][player.Y-1].taken ){
				ctx.drawImage(swordImage, player.x, player.y-32);
				attackEnemy(0, -32);
				}
				break;
			case "a": 
				swordImage.src = "img/sword_a.png";
				if ( player.X > 0 && !XY[currBG][player.X-1][player.Y].taken ){
				ctx.drawImage(swordImage, player.x-32, player.y);
				attackEnemy(-32, 0);
				}
				break;
			case "s": 
				swordImage.src = "img/sword_s.png";
				console.log("s");
				if ( player.Y < 6 && !XY[currBG][player.X][player.Y+1].taken ){
				console.log("dö");
				ctx.drawImage(swordImage, player.x, player.y+32);
				attackEnemy(0, 32);
				}
				break;
			case "d": 
				swordImage.src = "img/sword_d.png";
				if ( player.X < 11 && !XY[currBG][player.X+1][player.Y].taken ){
				ctx.drawImage(swordImage, player.x+32, player.y);
				attackEnemy(32, 0);
				}
				break;
			default: 
				break;
			}
			//console.log("nu ska vi kunna skjuta");	
		}
		
};


// The main game loop
main = function () {
	update();
	render();
};

gameOver = function() {
	
	bgReady = false;
	playerReady = false;
	enemyReady = false;
	gameGoing = false;
	
	
	document.getElementById('songTheme').pause();
	document.getElementById('die').play();
	
	if ( nrOfGold > bestResult)
	bestResult =  nrOfGold;
	
	ctx.drawImage(bgImage, 0, 0);
	
	// Score
	ctx.fillStyle = "red";
	ctx.font = "20px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Game Over!", bg.width/2 - 52 , 20);
	ctx.fillText("Press Enter", bg.width/2 - 52 , 40);
	
}

// Let's play this game!
//restart();
initGame();
setInterval(main, 125); // game loop
  
});
