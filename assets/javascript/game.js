var baseAtatck = 0; //original attack
var player;         //takes player object
var defender;       //takes defender object
var allCharacters = []; //array that stores all players
var playerSelected = false;//shows if we picked up a character
var defenderSelected = false;//shows if we picked up a defender
var enemiesArray = [];
var attacker;
var defender;

//constructor for all characters
function Character(name, hp, ap, counter, pic) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
    this.pic = pic;
}

// Initialize all the characters
function initCharacters() {
    var luke = new Character("Luke Skywalker", 100, 10, 5, "assets/images/lukeSkywalker.jpg");
    var vader = new Character("Darth Vader", 200, 50, 30, "assets/images/darthVader.jpg");
    var kylo = new Character("Kylo Ren", 150, 15, 2, "assets/images/kyloRen.jpg");
    var yoda = new Character("Master Yoda", 180, 30, 12, "assets/images/masterYoda.jpg");
    allCharacters.push(luke, vader, kylo, yoda);
}

// Create the character cards onscreen
function characterCards(divID) {
    for (var i = 0; i < allCharacters.length; i++) {
        $(divID).append("<div></div>");
        $(divID + " div:last-child").css({
            display: "inline-block",
            margin: "20px"
        });
        $(divID + " div:last-child").addClass("card");
        $(divID + " div:last-child").append("<h5></h5>");
        $(divID + " div:last-child h5").addClass("avatar");
        $(divID + " div:last-child h5").text(allCharacters[i].name);
        $(divID + " div:last-child").append("<img>");
        $(divID + " img:last-child").attr("id", allCharacters[i].name);
        $(divID + " img:last-child").attr("class", "card-img-top");
        $(divID + " img:last-child").attr("src", allCharacters[i].pic);
        $(divID + " div:last-child").append("<p></p>");
        $(divID + " div:last-child p").addClass("avatar");
        $(divID + " div:last-child p").text("HP: " + allCharacters[i].healthPoints);
    }
}

initCharacters();
characterCards("#placeForChosingCharacter");

// this function will load all the characters into the character section to be selected
var initializeGame = function() {
    // Loop through the characters object and call the renderCharacter function on each character to render their card.
    for (var key in allCharacters) {
      Character(allCharacters[key], ".card");
        console.log("clicked works");
    }
  };

  initializeGame();

  function renderEnemies(enemiesArray) {
        for(var i = 0; i < enemiesArray.length; i++) {
            initCharacters(enemiesArray[i],".enemies");
        }
  }

  // On click event for selecting our character.
 $(".yourCharacter").on("click", ".card" , function() {
    // Saving the clicked character's name.
    // var name = $(this).attr("data-name");
 
    // If a player character has not yet been chosen...
    if (!attacker) {
      // We populate attacker with the selected character's information.
      attacker = Character.name;
      // We then loop through the remaining characters and push them to the combatants array.
      for (var key in Characters) {
        if (key !== name) {
          enemiesArray.push(Characters[key]);
        }
      }
 
      // Hide the character select div.
      $(".avatar").hide();
 
      // Then render our selected character and our combatants.
      updateCharacter(attacker);
      renderEnemies(enemiesArray);
    }
  });