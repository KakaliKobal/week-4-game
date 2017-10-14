var yourCharacter;
var yourOpponents = [];
var selectedCharacter = "";

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
   
    
    renderCharacters(characters, "#character-section");

    var currentCharacter = characters[name];

    $(document).on("click", ".character", function(){
        var name = $(this).attr("data-name");
        console.log(name);

        if (!currentCharacter) {
            for (var key in characters) {
                if (key !== name) {
                    yourOpponents.push(characters[key]);
                }
            }

            console.log(yourOpponents);

            $("#character-section").hide();

            renderCharacters(currentCharacter, "#selected-character")
        }

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
    if (areaRender === "#character-section") {
        $(areaRender).empty();
        for (var key in charObj) {
            if (charObj.hasOwnProperty(key)) {
                renderOne(charObj[key], areaRender);
            }
        }
    } else if (areaRender == "#selected-character") {
        renderOne(charObj, areaRender);
    }

}





