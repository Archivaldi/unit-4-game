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
    var vader = new Character("Darth Vader", 200, 50, 20, "assets/images/darthVader.jpg");
    var kylo = new Character("Kylo Ren", 150, 15, 7, "assets/images/kyloRen.jpg");
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
        $(divID + " div:last-child").attr("hp", allCharacters[i].healthPoints);
        $(divID + " div:last-child").attr("ap", allCharacters[i].attackPower);
        $(divID + " div:last-child").attr("passiveAp", allCharacters[i].counterAttackPower);
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

//function that moves cards into atack and defend sections
$(".card").click(function choseHero() {
    if ($(".yourCharacter").children().length <= 1) {
        $(".card").appendTo(".enemies");
        $(".card").css("border-color", "red");
        $(this).appendTo(".yourCharacter");
        $(this).attr("data-value", "atacker");
        $(this).css("border-color", "green");
        attacker = $(this);
        attackerHP = parseInt(attacker.attr("hp"));
        attackerAP = parseInt(attacker.attr("ap"));
    } else if ($(".defender").children().length <= 1){
        $(".fightSection").text("");
        $(this).appendTo(".defender");
        $(this).attr("data-value", "defender");
        $(this).css("border-color", "black");
        defender = $(this);
        defenderHP = parseInt(defender.attr("hp"));
        defenderAP = parseInt(defender.attr("passiveAp"));
    } else {
        console.log("Atacker and Defender are chosen");
    }
});

//win function
function winnig() {
    if (defenderHP <= 0) {
        $(".defender .card").remove();
        $(".fightSection").text("Please chose another enemy!");
        gameWin();
    }
}

//lose function
function losing() {
    if (attackerHP <= 0) {
        $(attacker).remove();
        $("#attackButton").text("Restart");
        $("#attackButton").attr("id", "restartButton");
        $("#restartButton").on("click", function(){
            document.location.reload();
        })
        $(".fightSection").text("You Lost! Please try again!")
    } 
}

//check if we are already saved the Galaxy
function gameWin() {
    if (($(".enemies").children().length == 1) && ($(".defender").children().length == 1)){
        $("#attackButton").text("Restart");
        $("#attackButton").attr("id", "restartButton");
        $("#restartButton").on("click", function(){
            document.location.reload();
        })
        $(".fightSection").text("You saved the Galaxy!!!");
        $(".fightSection").css({
            fontSize: "100px",
            border: "5px solid white"
        });
    }
}
//function fir fighting
$("#attackButton").on("click", function(){
    if (($(".yourCharacter").children().length > 1) && ($(".defender").children().length > 1)){ 
        defenderHP -= attackerAP;
        $(".defender p.avatar").text("HP: " + defenderHP);
        $(".fightSection").append("<p>")
        $(".fightSection p:last-child").attr("id", "attackInfo");
        $("#attackInfo").text("You attacked " + $(".defender h5.avatar").text() + " for " + attackerAP + " damages");
        attackerAP += attackerAP;
        attackerHP -= defenderAP;
        $(".fightSection").append("<p>");
        $(".fightSection p:last-child").attr("id", "defendInfo");
        $("#defendInfo").text($(".defender h5.avatar").text() + " attacked " + $(".yourCharacter h5.avatar").text() + " for " + defenderAP + " damages");
        $(".yourCharacter p.avatar").text("HP: " + attackerHP);
        winnig();
        losing();
        gameWin();
    }
})
