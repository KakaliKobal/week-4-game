var yourCharacter;
var yourOpponents = [];
var currentOppenent;
var selectedCharacter;
var counter = 0;
var gameOver = false;

var characters = {
        "Qui Gon Jinn": {
            name: "Qui Gon Jinn",
            health: 120,
            attack: 8,
            counterAttack: 8,
            numberOfAttacks: 1,
            imageUrl: "assets/images/quigonjinn.jpeg"

        },

        "Obi Wan Kenobi": {
            name: "Obi Wan Kenobi",
            health: 100,
            attack: 5,
            counterAttack: 5,
            numberOfAttacks: 1,
            imageUrl: "assets/images/obiwankenobi.jpeg"
        },

        "Darth Maul": {
            name: "Darth Maul",
            health: 150,
            attack: 15,
            counterAttack: 20,
            numberOfAttacks: 1,
            imageUrl: "assets/images/darthmaul.jpeg"
        },

        "Darth Vader": {
            name: "Darth Vader",
            health: 180,
            attack: 25,
            counterAttack: 25,
            numberOfAttacks: 1,
            imageUrl: "assets/images/darthvader2.jpeg"
        }

    };

$(document).ready(function() {
   
    // $("#available-enemies").hide();
    renderCharacters(characters, "#character-choices");

    $(document).on("click", "#character-choices > .character", function(){
        var name = $(this).attr("data-name");

        selectedCharacter = characters[name];

        yourOpponents = characters;

        delete yourOpponents[name];

        writeAction("<p>You selected " + selectedCharacter.name + "!</p>");

        $("#character-section").hide();
        $("#selected-character-section").show();

        renderCharacters(selectedCharacter, "#selected-character");
        renderCharacters(yourOpponents, "#available-enemies");
    });

    $(document).on("click", "#available-enemies > .character", function() {
        var name = $(this).attr("data-name");

        if(currentOppenent) {return}

        currentOppenent = yourOpponents[name];

        delete yourOpponents[name];

        writeAction("<p>You selected " + currentOppenent.name + "!</p>");

        renderCharacters(yourOpponents, '#available-enemies');
        renderCharacters(currentOppenent, '#current-defender');
    });

    $("#attack-button").on("click", function() {

        if (!selectedCharacter || gameOver) {
            return
        }
 
        if (!currentOppenent){
            alert("You have not selected an opponent");
            return
        }


        counter++;

        attack = counter * selectedCharacter.attack;
        currentOppenent.health -= attack;

        renderCharacters(currentOppenent, "#current-defender");

        writeAction("<p>You attack " + attack +  "!</p>");

        if (currentOppenent.health < 1) {
            currentOppenent = null;
            $('#current-defender').hide();
            if (jQuery.isEmptyObject(yourOpponents)){
                gameOver = true;
                writeAction("<p>All your opponents are dead, you WIN!.</p>");
            } else {
                writeAction("<p>Your opponent is dead! Select another.</p>");
            }
            return

        } 

        selectedCharacter.health -= currentOppenent.counterAttack;

        writeAction("<p>" + currentOppenent.name + " attacked you back with " + currentOppenent.counterAttack +  "!</p>");


        if (selectedCharacter.health < 1) {
            //Game over
            gameOver = true;
            $("#selected-character").hide();
            writeAction("<p>You DIED! Game Over!</p>");
            return
        }


        renderCharacters(selectedCharacter, "#selected-character");

    })

});

var renderOne = function(character, renderArea) {
    var charDiv = $("<div class='character' data-name='" + character.name + "'>'");
    var charName = $("<div class= 'character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
}


var renderCharacters = function(charObj, areaRender) {
    $(areaRender).empty();
    $(areaRender).show();

    if (!charObj.name) {
        for (var key in charObj) {
            if (charObj.hasOwnProperty(key)) {
                renderOne(charObj[key], areaRender);
            }
        }
    } else {
        renderOne(charObj, areaRender);
    }

}

function writeAction(msg) {
    $("#actions").prepend(msg);
    if ($("#actions > p").length > 7) {
        $("#actions > p:last").remove();
    }
}




