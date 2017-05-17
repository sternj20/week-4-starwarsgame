// --------------------------------testing------------------------------
$(document).ready(function() {


//variables

var charChosen;
var chars = [

{name: 'Boba Fett',
hps:150,
src: 'assets/images/bobafett.png'},

{name: 'Darth Maul',
hps:180,
src: 'assets/images/darthmaul.jpeg'},

{name: 'Obi-Wan Kenbobi',
hps:120,
src: 'assets/images/kenobi.png'},

{name: 'Luke Skywaker',
hps: 100,
src: 'assets/images/skywalker.jpg'}

];

//dom variables

var chooseChars = $(".chooseChars");
var chosenChar = $(".chosenChar");
var enemies = $("#enemies");
var enemiesAttack = $(".enemiesAttack");
var defender = $(".defender");

//character container
var characters = $(".container");


//functions

//initialize game
function reset () {
	charChosen = false;
	//iterating through the array of different character objects
	for (var i = 0; i < chars.length; i++){
		//creating a div for each character 
		var charDiv = $("<div>");
		charDiv.addClass("characters");
		chooseChars.append(charDiv);
		///div for the name of character
		var charName = $("<div>");
		charName.addClass("charName");
		charName.text(chars[i].name);
		//adding name to character div
		charDiv.append(charName);
		//div for the img of the character
		var charImg = $("<img>");
		charImg.addClass("characterImgs");
		charImg.attr("src", chars[i].src);
		//adding the img to character div
		charDiv.append(charImg);
		//div for hps of character
		var charHps = $("<div>");
		charHps.addClass("charHps");
		charHps.text(chars[i].hps);
		//adding hps to character div
		charDiv.append(charHps);
	}
}

//event listener for character select stage

$(document).on('click', '.characters', function(event) {

	if(!charChosen){
		$(this).removeClass('characters').addClass('chosenChar');
	//move selected character to selected character section
	chosenChar.append(this);
	charChosen = true;
	//move remaining characters to enemies to fight section
	enemiesAttack.append($(".characters"));
}
});

//event listener for attack stage

$(".enemiesAttack").on('click', '.characters', function(event) {
	if(defender[0].children.length === 0){
		$(this).removeClass('characters').addClass('activeDefender');
		defender.append(this);
	}
	
});

//function calls

reset();

});
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

Show on document how many hps you attacked for and how many hps you were attacked for 
If your hps turn to 0 you lose
Show on document, you have lost. 
restart game button appears. 
Press restart button to restart
Can no longer press attack button
If defenders hps turn to 0, defender dissapears
Show on document 'you have defeated "defender", you can choose to fight another enemy'
If you press attack button, nothing happens, it shows on document there is no enemy here 
Go back to step 2
If all the enemies are defeated show on document 'You won! Game over'
Attack button does nothing 
Can press restart button 



$(document).ready(function() {
});


//global variables

var clickCounter = 1;
var isCharChosen = 'false';

//dom variables

var characters = $(".characters");
var activeChars = $("#activeChars");
var activeDefenders = $("#activeDefenders");
var enemies = $("#enemiesToAttack");
var attack = $("#attack");
var pointsLost = $("#pointsLost");
var pointsGiven = $("#pointsGiven");

//settings hps and attack points
var darth = $("#darthHps");
var boba = $("#bobaHps");
var kenobi = $("#kenobiHps");
var luke = $("#lukeHps");

//hps
darth.attr("data-hps", 180);
boba.attr("data-hps", 150);
kenobi.attr("data-hps", 120);
luke.attr("data-hps", 100);

//attack pts
darth.attr("data-attackPts", 25);
boba.attr("data-attackPts", 20);
kenobi.attr("data-attackPts", 10);
luke.attr("data-attackPts", 5);

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
	} else if (activeDefenders[0].children.length < 1){
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
	var defendersAttack = parseInt(chosenCharsText.attr('data-attackPts'));
	//defining variable for amount chosen character attacks for
	var attackAmt =  8 * clickCounter;
	//defining variables for chosen character and active defender names
	var defenderName =  activeDefenders.find('.charName')[0].innerText;

	//if there is an enemy in the defender section 
	if(activeDefenders[0].children.length > 0){
		// attack the defender for a certain amount that gets increased each time you attack
		defenderHps -= attackAmt;
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
			// If your hps is less than 0 
			if(chosenCharHps < 0 ){
				// Show on document, you have lost. 
				pointsGiven.text('You have been defeated, game over.');
				pointsLost.text('');
			// If defenders hps turn to 0
			} else if (defenderHps < 0){
				$("#activeDefenders").empty();
				pointsGiven.text('You have defeated ' + defenderName + ' you can choose to fight another enemy.');
			} else {
		//show how much you attacked for in document
		pointsGiven.text('You attacked ' + defenderName + ' for ' + attackAmt + ' damage.');
		//show how much you were attacked for in document
		pointsLost.text(defenderName + ' attacked you back for ' + defendersAttack + ' damage.');
			}
		}
	});

// -----------4-----------

// Show on document how many hps you attacked for and how many hps you were attacked for 
// If your hps turn to 0 you lose
// Show on document, you have lost. 
// restart game button appears. 
// Press restart button to restart
// Can no longer press attack button
// If defenders hps turn to 0, defender dissapears
// Show on document 'you have defeated "defender", you can choose to fight another enemy'
// If you press attack button, nothing happens, it shows on document there is no enemy here 
// Go back to step 2
// If all the enemies are defeated show on document 'You won! Game over'
// Attack button does nothing 
// Can press restart button 





*/