import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DndService from "./js/dnd-service.js";
import Character from "./js/character";
import CharClass from "./js/char-class";
import Race from "./js/race";

//UI Logic
function displayRace(race){
  let languages = race.languages.getLanguages();
  $("#displayRace").text(`name: ${race.name}, speed: ${race.speed}, size: ${race.size}, languages: ${languages}`);
  displayBonuses(race);
}

function displayClass(charClass){
  $("#displayClass").text(`class: ${charClass.name}, hit die: ${charClass.hitDie}, saving throws: ${charClass.savingThrows[0].name}, ${charClass.savingThrows[1].name}`);
}

function displayBonuses(race){
  $("#displayAbilityBonus").text(`STR: ${race.bonuses.get("str")} DEX: ${race.bonuses.get("dex")}  CON: ${race.bonuses.get("con")}  INT:${race.bonuses.get("int")}  WIS:${race.bonuses.get("wis")}  CHA: ${race.bonuses.get("cha")} `);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

function disableAbilityScoreOption(option) {
  switch ($(`${option}`).find(":selected").val()) {
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
    let abilityScores = {};
    abilityScores.str += parseInt($("#charStrength").find(":selected").val());
    abilityScores.dex += parseInt($("#charDexterity").find(":selected").val());
    abilityScores.con += parseInt($("#charConstitution").find(":selected").val());
    abilityScores.int += parseInt($("#charIntelligence").find(":selected").val());
    abilityScores.wis += parseInt($("#charWisdom").find(":selected").val());
    abilityScores.cha += parseInt($("#charCharisma").find(":selected").val());
    character.addAbilityScores(abilityScores);
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
        displayClass(newClass);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
    DndService.getService("races", charRace)
      .then(function(response){
        if (response instanceof Error) {
          throw Error(`DnD API error: ${response.message}`);
        }
        let newRace = new Race(response.name, response.speed, response.size, response.languages);
        newRace.getAbilityBonuses(response);
        newRace.getLanguages(response);
        character.addRace(newRace);
        console.log(character);
        displayRace(newRace);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
  // Standard Array UI logic
  $("select#charStrength").change(() => {
    disableAbilityScoreOption(`#charStrength`);
  });
  $("select#charDexterity").change(() => {
    disableAbilityScoreOption(`#charDexterity`);
  });
  $("select#charConstitution").change(() => {
    disableAbilityScoreOption(`#charConstitution`);
  });
  $("select#charIntelligence").change(() => {
    disableAbilityScoreOption(`#charIntelligence`);
  });
  $("select#charWisdom").change(() => {
    disableAbilityScoreOption(`#charWisdom`);
  });
  $("select#charCharisma").change(() => {
    disableAbilityScoreOption(`#charCharisma`);
  });
  $("#resetAbilityScores").click(() => {
    $("#charStrength").prop("selectedIndex", 0);
    $("#charDexterity").prop("selectedIndex", 0);
    $("#charConstitution").prop("selectedIndex", 0);
    $("#charIntelligence").prop("selectedIndex", 0);
    $("#charWisdom").prop("selectedIndex", 0);
    $("#charCharisma").prop("selectedIndex", 0);
    $(".option15").prop("disabled", false);
    $(".option14").prop("disabled", false);
    $(".option13").prop("disabled", false);
    $(".option12").prop("disabled", false);
    $(".option10").prop("disabled", false);
    $(".option8").prop("disabled", false);
  });
});