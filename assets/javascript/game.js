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

//dom variables

var characters = $(".characters");
var activeChars = $("#activeChars");
var activeDefenders = $("#activeDefenders");
var enemies = $("#enemiesToAttack");
// -------------1----------------


characters.on('click', function() {
	//if the character you are clicking on is not already in the enemies section
	if(!$.contains(enemies[0], this)){
		// it moves it down into the character section
		enemies.append(characters);
		// the remaining characters move down into enemies to attack
		activeChars.append(this);
		// their backgrounds turn to red color
		for(var i = 0; i < enemies[0].children.length; i++){
			enemies[0].children[i].style.background='red';
		}
	}
});


// ------------2---------------

// Click on an enemy to attack, it moves to the defender section
// Its background turns to black