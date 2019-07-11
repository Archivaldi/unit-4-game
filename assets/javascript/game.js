var lukeSkywalkerHp = 100;
$(".hp").eq(0).text(lukeSkywalkerHp);
var darthVaderHp = 180;
$(".hp").eq(1).text(darthVaderHp);
var masterYodaHp = 150;
$(".hp").eq(2).text(masterYodaHp);
var kyloRenHp = 120;
$(".hp").eq(3).text(kyloRenHp);

function choseTheCharacter() {
    $(".avatar").click(function () {
        $(".avatar").appendTo(".enemies");
        $(".avatar").css("border-color", "red");
        $(this).appendTo(".yourCharacter");
        $(this).css("border-color", "green");
        $(this).removeClass("col-lg-2");
        $(".gameZone").css("width", "50%")
    })
}