// --------------------------------testing------------------------------
$(document).ready(function() {
//variables

var charChosen;
//counter to increase the attack power by 8 for each attack chosen char has
var counter = 1;

//variable of characters stored as an array of objects
var chars = [
{name: 'Boba Fett',
hps:150,
attack:5,
src: 'assets/images/bobafett.png'},

{name: 'Darth Maul',
hps:180,
attack:20,
src: 'assets/images/darthmaul.jpeg'},

{name: 'Obi-Wan Kenobi',
hps:120,
attack:10,
src: 'assets/images/kenobi.png'},

{name: 'Luke Skywaker',
hps: 100,
attack:15,
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
var reset = function reset () {
	$(".attackButton").hide();
	$(".restart").hide();
	$(".fightSection").hide();
	$("#pointsGiven").text('');
	charChosen = false;
	counter = 1;
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
		charImg.attr("data-attackPts", chars[i].attack);
		//adding the img to character div
		charDiv.append(charImg);
		//div for hps of character
		var charHps = $("<div>");
		charHps.addClass("charHps");
		charHps.text(chars[i].hps);
		//adding hps to character div
		charDiv.append(charHps);
	}
};

//event listener for character select stage
$(document).on('click', '.characters', function(event) {
	//if a character has not been chosen yet
	if(!charChosen){
		//move selected character to selected character section
		chosenChar.append(this);
		$(this).removeClass('characters').addClass('chosenChar');
		//changing boolean to true so this code only gets run once
		charChosen = true;
		//move remaining characters to enemies to fight section
		enemiesAttack.append($(".characters"));
		$(".enemiesAttack").show();
	}
});

//event listener for attack stage
$(".enemiesAttack").on('click', '.characters', function(event) {
	$("#pointsGiven").text('');
	$(".fightSection").show();
	//if there are no characters in defense stage
	if ($(".activeDefender").length === 0){
			//create new div for defender
			var newDefender = $("<div>");
			$(this).removeClass('characters').addClass('activeDefender');
			//add selected character to defense stage
			newDefender.append(this);
			$(".fightSection").append(newDefender);
			$(".enemiesAttack").hide();
			$(".attackButton").show();
		}	
	});

//event listener for fight stage
$(document).on('click', "#lightsaber", function(event) {
	//variable for active defenders name
	var defenderName = $(".activeDefender").find(".charName")[0].innerText;
	//selecting the div where our hps are stored on our characters
	var charHpsDiv = $(".activeDefender").find(".charHps")[0];
	var chosenCharHpsDiv = $(".chosenChar").find(".charHps")[0];
	//divs for the amount of attack pts on our characters
	var charAttackPts = parseInt($(".activeDefender").find(".characterImgs").attr("data-attackPts"));
	var chosenCharsAttackPts = parseInt($(".chosenChar").find(".characterImgs").attr("data-attackPts")*counter);
	if (chosenCharHpsDiv.innerText > 0){
		//updating text in dom to show points given
		charHpsDiv.innerText -= chosenCharsAttackPts;
		//updating text in dom to show points lost
		chosenCharHpsDiv.innerText -= charAttackPts;
		//increase counter
		counter++;
	}
			// If your hps is less than 0 
			if(chosenCharHpsDiv.innerText <= 0 ){
				// Show on document, you have lost. 
				$("#pointsGiven").text('You have been defeated by ' + defenderName + ' , game over.');
				$("#pointsLost").text('');
				$(".restart").show();
				// If defenders hps turn to 0
			} else if ( charHpsDiv.innerText < 0){
				$(".activeDefender").remove();
				$("#pointsGiven").text('You have defeated ' + defenderName + ' you can choose to fight another enemy.');
				$("#pointsLost").text('');
				$(".enemiesAttack").show();
			} else {
				$("#pointsGiven").text('You attacked ' + defenderName + ' for ' + chosenCharsAttackPts);
				$("#pointsLost").text(defenderName + ' attacked you for ' + charAttackPts);
			}
		});

//event listener for restart button
$(".restart").on("click", $(".restartBtn"), function(){
	characters.empty();
	$(".activeDefender").remove();
	reset();
});

//function calls

reset();

});
