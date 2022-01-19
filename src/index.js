import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DndService from "./js/dnd-service.js";
import Character from "./js/character";
import CharClass from "./js/char-class";
import Race from "./js/race";

//Business Logic
function makeClass(response){
  let newClass = new CharClass(response.name, response.hit_die, response.proficiency_choices, response.proficiencies, response.saving_throws);
  return newClass;
}

function makeRace(response){
  let newRace = new Race(response.name, response.speed, response.size, response.languages);
  return newRace;
}

function getLanguages(languageResponse) {
  let languageString = "";
  languageResponse.forEach(function(element){
    languageString = languageString + ", " + element.name;
  });
  return languageString;
}

//UI Logic
function displayRace(race){
  let languages = getLanguages(race.languages);
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


$(document).ready(function(){
  $("#formOne").submit(function(){
    event.preventDefault();
    // Create Character
    let character = new Character();
    // Get Ability Scores
    let abilityScores = [];
    abilityScores.push(parseInt($("#charStrength").find(":selected").val()));
    abilityScores.push(parseInt($("#charDexterity").find(":selected").val()));
    abilityScores.push(parseInt($("#charConstitution").find(":selected").val()));
    abilityScores.push(parseInt($("#charIntelligence").find(":selected").val()));
    abilityScores.push(parseInt($("#charWisdom").find(":selected").val()));
    abilityScores.push(parseInt($("#charCharisma").find(":selected").val()));
    let charClass = $("#charClass").val();
    let charRace = $("#charRace").val();
    let newClass;
    let newRace;
    DndService.getService("classes", charClass)
      .then(function(response){
        if (response instanceof Error) {
          throw Error(`DnD API error: ${response.message}`);
        }
        newClass = makeClass(response);
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
        newRace = makeRace(response);
        newRace.getAbilityBonuses(response);
        displayRace(newRace);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
  // Standard Array UI logic
  $("select#charStrength").change(() => {
    switch ($("#charStrength").find(":selected").val()) {
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
  });
  $("select#charDexterity").change(() => {
    switch ($("#charDexterity").find(":selected").val()) {
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
  });
  $("select#charConstitution").change(() => {
    switch ($("#charConstitution").find(":selected").val()) {
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
  });
  $("select#charIntelligence").change(() => {
    switch ($("#charIntelligence").find(":selected").val()) {
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
  });
  $("select#charWisdom").change(() => {
    switch ($("#charWisdom").find(":selected").val()) {
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
  });
  $("select#charCharisma").change(() => {
    switch ($("#charCharisma").find(":selected").val()) {
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