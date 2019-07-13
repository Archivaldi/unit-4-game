var baseAttack; //original attack
var player;         //takes player object
var defender;       //takes defender object
var allCharacters = []; //array that stores all players
var playerSelected = false;//shows if we picked up a character
var defenderSelected = false;//shows if we picked up a defender
var attacker;
var defender;

var audioTheme = new Audio('assets/audio/theme.mp3');
var audioHit = new Audio("assets/audio/hit.mp3");

//play theme audio

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
    var luke = new Character("Luke Skywalker", 100, 10, 9, "assets/images/lukeSkywalker.jpg");
    var vader = new Character("Darth Vader", 180, 2, 16, "assets/images/darthVader.jpg");
    var kylo = new Character("Kylo Ren", 120, 4, 10, "assets/images/kyloRen.jpg");
    var yoda = new Character("Master Yoda", 150, 3, 14, "assets/images/masterYoda.jpg");
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
        $(divID + " div:last-child").attr("bAp", allCharacters[i].attackPower);
        $(divID + " div:last-child").attr("hp", allCharacters[i].healthPoints);
        $(divID + " div:last-child").attr("ap", allCharacters[i].attackPower);
        $(divID + " div:last-child").attr("counter", allCharacters[i].counterAttackPower);
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
        $(this).show(1000);
        $(this).attr("data-value", "atacker");
        $(this).css("border-color", "green");
        attacker = $(this);
        attackerHP = parseInt(attacker.attr("hp"));
        attackerAP = parseInt(attacker.attr("ap"));
        baseAttack = parseInt(attacker.attr("bap"));
        audioTheme.play();

            //we change background image depends on chosen hero
            if ($(attacker).find("h5").text() === "Luke Skywalker") {
                $("body").css("background-image", "url(assets/images/LukeBody.jpg)");
            } else if ($(attacker).find("h5").text() === "Darth Vader") {
                $("body").css("background-image", "url(assets/images/dart.jpg)");
            } else if ($(attacker).find("h5").text() === "Kylo Ren") {
                $("body").css("background-image", "url(assets/images/kyloBody.jpg)");
            } else if ($(attacker).find("h5").text() === "Master Yoda") {
                $("body").css("background-image", "url(assets/images/yodaBody.jpg)");
            }

    } else if ($(".defender").children().length <= 1) {
        $(this).show(1000);
        $(".fightSection").text("");
        $(this).appendTo(".defender");
        $(this).attr("data-value", "defender");
        $(this).css("border-color", "black");
        defender = $(this);
        defenderHP = parseInt(defender.attr("hp"));
        defenderAP = parseInt(defender.attr("counter"));
    } else {
        console.log("Atacker and Defender are chosen");
    }
});

//win function
function winnig() {
    if (defenderHP <= 0) {
        $(".fightSection").text("You have defeated " + $(".defender h5.avatar").text() + ", you can chose another enemy.");
        $(defender).remove();
        gameWin();
    }
}

//lose function
function losing() {
    if (attackerHP <= 0) {
        $(attacker).remove();
        $("#attackButton").text("Restart");
        $("#attackButton").attr("id", "restartButton");
        $(defender).hide(3000);
        $("#restartButton").on("click", function () {
            document.location.reload();
        })
        $(".fightSection").text("Game Over!");
        $(".fightSection").css({
            textAlign: "center",
            fontSize: "70px",
            border: "3px solid black",
            width: "35%"
        })
    }
}

//dunction for enemy attack 
function enemyHit() {
    if (defenderHP > 0){
        attackerHP -= defenderAP;
        $(".fightSection").append("<p>");
        $(".fightSection p:last-child").attr("id", "defendInfo");
        $("#defendInfo").text($(".defender h5.avatar").text() + " attacked " + $(".yourCharacter h5.avatar").text() + " for " + defenderAP + " damages");
        $(".yourCharacter p.avatar").text("HP: " + attackerHP);
    }
}

//check if we are already saved the Galaxy
function gameWin() {
    if (($(".enemies").children().length == 1) && ($(".defender").children().length == 1)) {
        $("#attackButton").text("Restart");
        $("#attackButton").attr("id", "restartButton");
        $("#restartButton").on("click", function () {
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
$("#attackButton").on("click", function () {
    if (($(".yourCharacter").children().length > 1) && ($(".defender").children().length > 1)) {
        defenderHP -= attackerAP;
        $(".defender p.avatar").text("HP: " + defenderHP);
        $(".fightSection").append("<p>")
        $(".fightSection p:last-child").attr("id", "attackInfo");
        $("#attackInfo").text("You attacked " + $(".defender h5.avatar").text() + " for " + attackerAP + " damages");
        attackerAP += baseAttack;
        audioHit.play();
        enemyHit();
        winnig();
        losing();
        gameWin();
    }
})
