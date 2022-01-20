import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DndService from "./js/dnd-service.js";
import Character from "./js/character";
import CharClass from "./js/char-class";
import Race from "./js/race";

//UI Logic
function displayRace(character){
 // let languages = character.race.getLanguages();
  $("#displayRace").text(`Race: ${character.race.name}, Speed: ${character.race.speed}, Size: ${character.race.size}, Languages: ${languages}`);
}

function displayClass(character){
  $("#displayClass").text(`Class: ${character.characterClass.name}, Hit die: ${character.characterClass.hitDie}, Saving throws: ${character.characterClass.savingThrows[0].name}, ${character.characterClass.savingThrows[1].name}`);
}

function displayBonuses(character){
  $("#displayAbilityBonus").text(`STR: ${character.race.bonuses.get("str")} DEX: ${character.race.bonuses.get("dex")}  CON: ${character.race.bonuses.get("con")}  INT:${character.race.bonuses.get("int")}  WIS:${character.race.bonuses.get("wis")}  CHA: ${character.race.bonuses.get("cha")} `);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

function disableAbilityScoreOption(option) {
  $(`${option}`).prop("disabled", true);
  switch ($(`${option}:checked`).val()) {
  case "15":
    $(".option15").prop("disabled", true);
    break;
  case "14":
    $(".option14").prop("disabled", true);
    break;
  case "13":
    $(".option13").prop("disabled", true);
    break;
  case "12":
    $(".option12").prop("disabled", true);
    break;
  case "10":
    $(".option10").prop("disabled", true);
    break;
  case "8":
    $(".option8").prop("disabled", true);
    break;
  }
}

$(document).ready(function(){
  $("#formOne").submit(function(){
    event.preventDefault();
    // Create Character
    let character = new Character();
    // Get Player Name, Character Name, & Alignment
    let playerName = $("#playerName").val();
    let characterName = $("#charName").val();
    let alignment = $("#charAlignment").find(":selected").val();
    character.addPlayerName(playerName);
    character.addCharacterName(characterName);
    character.addAlignment(alignment);
    // Get Ability Scores
    character.abilityScores.str += parseInt($(`input[name="str"]:checked`).val());
    character.abilityScores.dex += parseInt($(`input[name="dex"]:checked`).val());
    character.abilityScores.con += parseInt($(`input[name="con"]:checked`).val());
    character.abilityScores.int += parseInt($(`input[name="int"]:checked`).val());
    character.abilityScores.wis += parseInt($(`input[name="wis"]:checked`).val());
    character.abilityScores.cha += parseInt($(`input[name="cha"]:checked`).val());
    // Get Race and Class
    let charClass = $("#charClass").val();
    let charRace = $("#charRace").val();
    DndService.getService("classes", charClass)
      .then(function(response){
        if (response instanceof Error) {
          throw Error(`DnD API error: ${response.message}`);
        }
        let newClass = new CharClass(response.name, response.hit_die, response.proficiency_choices, response.proficiencies, response.saving_throws);
        character.addCharacterClass(newClass);
        displayClass(character);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
    DndService.getService("races", charRace)
      .then(function(response){
        if (response instanceof Error) {
          throw Error(`DnD API error: ${response.message}`);
        }
        newRace = makeRace(response);
        newRace.getLanguages(response);
        newRace.getAbilityBonuses(response);
        return DndService.getService("subraces", newRace.subrace);
      })
      .then((subraceResponse) => {
        if(subraceResponse instanceof Error) {
          throw Error (`DnD Api Error: ${subraceResponse.message}`);
        }

        newRace.getSubBonuses(subraceResponse, newRace.bonuses);
        displayRace(newRace);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
      // DndService.getService("subraces", newRace.subrace)
      // .then(function(response){
      //   if (response instanceof Error) {
      //     throw Error(`DnD API error: ${response.message}`);
      //   } 
      //   displayRace(newRace);
      // })
      // .catch(function(error) {
      //   displayErrors(error.message);
      // });
      
      
     
  });
  // Standard Array UI logic
  $("#charStrength").change(() => {
    disableAbilityScoreOption(`input[name="str"]`);
  });
  $("#charDexterity").change(() => {
    disableAbilityScoreOption(`input[name="dex"]`);
  });
  $("#charConstitution").change(() => {
    disableAbilityScoreOption(`input[name="con"]`);
  });
  $("#charIntelligence").change(() => {
    disableAbilityScoreOption(`input[name="int"]`);
  });
  $("#charWisdom").change(() => {
    disableAbilityScoreOption(`input[name="wis"]`);
  });  
  $("#charCharisma").change(() => {
    disableAbilityScoreOption(`input[name="cha"]`);
  });
  $("#resetAbilityScores").click(() => {
    $(`input[name="str"]`).prop("checked", false);
    $(`input[name="dex"]`).prop("checked", false);
    $(`input[name="con"]`).prop("checked", false);
    $(`input[name="int"]`).prop("checked", false);
    $(`input[name="wis"]`).prop("checked", false);
    $(`input[name="cha"]`).prop("checked", false);
    $(".option15").prop("disabled", false);
    $(".option14").prop("disabled", false);
    $(".option13").prop("disabled", false);
    $(".option12").prop("disabled", false);
    $(".option10").prop("disabled", false);
    $(".option8").prop("disabled", false);
  });
});