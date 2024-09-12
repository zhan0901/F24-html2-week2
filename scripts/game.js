// JavaScript Document

var moveTime = 3200;
var blockPos = -1;
var block = 1;

$(document).ready(function(){	
	//animate the first block... (or call a function to do so, and pass it a time)
	animateRight(1);

	$("body").focus();
	$("body").keypress(function(event) {
		//console.log(event.which);   ...s reports as 115
		if(event.which == 115){
			//stop the animation!
			$(".active").stop();		
			//subtract an amount from the time...
			moveTime = Math.floor(moveTime/1.4);
			
			if(blockPos > -1){
				//if pos is greater than -1, check to see if the stack is proper...
				if($(".active").position().left > (blockPos-40) && $(".active").position().left < (blockPos+40)){
					if(block == 8){
						//if this was the last row, call the you win function
						youWin();
					}else{
						//call to active the next row if the check was successful
						nextRow();
					}
				}else{
					//call the lose function!
					youLose();	
				}
			}else{
				//call to activate the next row, without checking
				nextRow();	
			}
		}
	});
});


//this animates a block right...
function animateRight(t){
	//then, animate the block
	$(".active").animate({'left':'360px'}, moveTime*t, 'linear', function(){
		//once the animation is finished, call to animated it back
		animateLeft(1);
	});
}

//this animates a block left...
function animateLeft(t){
	$(".active").animate({'left':'0'}, moveTime*t, 'linear', function(){
		//once the animation is finished, call to animated it back
		animateRight(1);
	});
}

//makes another row in the game!
function nextRow(){
	//get the position of the last block, and chart it in blockPos
	blockPos = $(".active").position().left;
	//remove the active class from the current penguin
	$(".active").removeClass("active");
	//count to the next block
	block++;
	
	//generate the target
	var tt = "#game img:nth-child(" + block + ")";
	var newBlock = $(tt);
	//add the active class to the new penguin
	newBlock.addClass("active");

	//figure out which grid column the penguin is in
	var cl = newBlock.position();
	
	//set the left position of the active block to be its current position rounded down
	//(this is because javascript and jquery can't see the position inside a grid)
	newBlock.css("grid-column","1");
	newBlock.css("left", cl.left);

	//calculate the offset necessary to the time and send it along with the function
	var ofst = 1;
	if(cl.left != 0 || cl.left != 360){
		ofst = (cl.left*0.9) / 400;
	}

	//finally, animate the next penguin
	if(cl.left < 210){
		animateRight(1-ofst);
	}else{
		animateLeft(ofst);
	}	
}


//creates a 'you win' message
function youWin(){
	unbind();
	//make a div...surprisingly, document.createElement is the best and fastest way of doing this
	var overlay = document.createElement("div");
	//add classes
	$(overlay).addClass("overlay success");
	//add text
	$(overlay).html("You Win!");
	//add to page
	$(overlay).appendTo("body");
}

//creates a 'you lose' message
function youLose(){
	unbind();
	//make a div...surprisingly, document.createElement is the best and fastest way of doing this
	var overlay = document.createElement("div");
	//add classes
	$(overlay).addClass("overlay fail");
	//add text
	$(overlay).html("You Lose!");
	//add to page
	$(overlay).appendTo("body");
}

function unbind(){
	//remove the keypress functionality from the body
	$("body").off("keypress");	
}
