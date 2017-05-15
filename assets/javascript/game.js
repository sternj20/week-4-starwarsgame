/* 

-------------1----------------

When you click on a character, it moves it down into the character section

The remaining characters move down into enemies to attack
Their backgrounds turn to red color


------------2---------------

Click on an enemy to attack, it moves to the defender section
Its background turns to black


----------3--------------

Press attack button and you attack the defender for a certain amount that gets increased each time you attack
They attack you back for the same amount every time
The amount you attack for gets subtracted from their hps
The amount they attack for gets subtracted from their hps

-----------4-----------

If your hps turn to 0 you lose, restart game button appears. Press restart button to restart
If defenders hps turn to 0, defender dissapears
Go back to step 2

*/

//global variables

var clickCounter = 1;
var isCharChosen = 'false';

//dom variables

var characters = $(".characters");
var activeChars = $("#activeChars");
var activeDefenders = $("#activeDefenders");
var enemies = $("#enemiesToAttack");
var attack = $("#attack");

//settings hps and attack points

$(".charHps").attr("data-hps", 120);
characters.attr("data-attackPts", 30);

// -------------1----------------


characters.on('click', function() {
	//if the character you are clicking on is not already in the enemies or defender section
	if(!$.contains(enemies[0], this) && isCharChosen === 'false'){
		// it moves it down into the character section
		enemies.append(characters);
		// the remaining characters move down into enemies to attack
		activeChars.append(this);
		// their backgrounds turn to red color
		for(var i = 0; i < enemies[0].children.length; i++){
			enemies[0].children[i].style.background='red';
		}
		//change variable to true so this code won't get run with additional clicks
		isCharChosen = 'true';
	} else if ($.contains(enemies[0], this) && activeDefenders[0].children.length < 1){
		// Click on an enemy to attack, it moves to the defender section
		activeDefenders.append(this);
		// Its background turns to black
		activeDefenders[0].children[0].style.background='black';
	}	
});

// Press attack button and you attack the defender for a certain amount that gets increased each time you attack
attack.on('click', function() {
	//defining variables for the text divs with hps of character in defender and chosen character areas
	var defenderHpsText = activeDefenders.find('.charHps');
	var chosenCharsText = activeChars.find('.charHps');
	//defining variables for the data with hps of character in defender and chosen character areas and converting to integer
	var defenderHps = parseInt(defenderHpsText.attr("data-hps"));
	var chosenCharHps = parseInt(chosenCharsText.attr("data-hps"));
	//defining variable for amount defender attacks for
	var defendersAttack = parseInt(characters.attr('data-attackPts'));

	//if there is an enemy in the defender section 
	if(activeDefenders[0].children.length > 0){
		// attack the defender for a certain amount that gets increased each time you attack
		defenderHps -= 8 * clickCounter;
		// defender attacks you for a fixed amount each time 
		chosenCharHps -= defendersAttack;
		//update hps in dom and data value of hps 
		chosenCharsText.text(chosenCharHps);
		chosenCharsText.attr('data-hps', chosenCharHps);
		//increase the click counter each time you click attack to increase attack amount
		clickCounter++;
		//update hps in dom and data vlue of hps
		defenderHpsText.text(defenderHps);
		defenderHpsText.attr("data-hps", defenderHps);
	}
});


