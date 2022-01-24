import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DndService from "./js/dnd-service.js";
import Character from "./js/character";
import CharClass from "./js/char-class";
import Race from "./js/race";

//UI Logic

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

function displayPointBuyBonuses(character){
  let scores = Object.fromEntries(character.race.bonuses);
  $("#strBonus").text(scores.str);
  $("#dexBonus").text(scores.dex);
  $("#conBonus").text(scores.con);
  $("#intBonus").text(scores.int);
  $("#wisBonus").text(scores.wis);
  $("#chaBonus").text(scores.cha);
}

function displayPointBuyScore(character){
  let str = character.abilityScores.str + character.race.bonuses.get('str');
  let dex = character.abilityScores.dex + character.race.bonuses.get('dex');
  let con = character.abilityScores.con + character.race.bonuses.get('con');
  let int = character.abilityScores.int + character.race.bonuses.get('int');
  let wis = character.abilityScores.wis + character.race.bonuses.get('wis');
  let cha = character.abilityScores.cha + character.race.bonuses.get('cha');

  $("#strNum").text(character.abilityScores.str);
  $("#dexNum").text(character.abilityScores.dex);
  $("#conNum").text(character.abilityScores.con);
  $("#intNum").text(character.abilityScores.int);
  $("#wisNum").text(character.abilityScores.wis);
  $("#chaNum").text(character.abilityScores.cha);
  $("#strAbilityScore").text(str);
  $("#dexAbilityScore").text(dex);
  $("#conAbilityScore").text(con);
  $("#intAbilityScore").text(int);
  $("#wisAbilityScore").text(wis);
  $("#chaAbilityScore").text(cha);
  displayPointBuyBonuses(character);
  $("#pointsRemaining").text(character.pointBuy);
}

function attachIncreaseListeners(character){
  Object.keys(character.abilityScores).forEach((score) => {
    $(`#${score}Up`).on("click", () => {
      character.increaseScore(score);
      displayPointBuyScore(character);
      $("#pointBuyPoints").html(character.pointBuy);
    });
  });
}

function attachDecreaseListeners(character){
  Object.keys(character.abilityScores).forEach((score) => {
    $(`#${score}Down`).on("click", () => {
      character.decreaseScore(score);
      displayPointBuyScore(character);
      $("#pointBuyPoints").html(character.pointBuy);
    });
  });
}

function displayAbilityScores(character) {
  Object.keys(character.abilityScores).forEach((abilityScore) => {
    $(`#${abilityScore}AbilityScore`).text(character.abilityScores[abilityScore] + character.race.bonuses.get(abilityScore));
  });
  Object.keys(character.abilityModifiers).forEach((abilityModifier) => {
    $(`#${abilityModifier}AbilityModifier`).text(character.abilityModifiers[abilityModifier]);
  });
}

function displayCharacterHeader(character) {
  $(`#charNameDisplay`).text(character.characterName);
  $(`#playerNameDisplay`).text(character.playerName);
  $(`#raceDisplay`).text(character.race.name);
  $(`#classDisplay`).text(character.characterClass.name);
  $(`#alignmentDisplay`).text(character.alignment);
}

function displayCharacterStats(character) {
  $(`#speedDisplay`).text(character.race.speed);
  $(`#armoreClassDisplay`).text(character.addArmorClass);
}

function attachCharacterListeners(character){
  $("#playerName").on("change", function(){
    character.playerName = $("#playerName").val();
    $("#playerNameDisplay").text(character.playerName);
  });
  $("#charName").on("change", function(){
    character.characterName = $("#charName").val();
    $("#charNameDisplay").text(character.characterName);
  });
  $("#charAlignment").on("change", function(){
    character.alignment = $("#charAlignment").val();
    $("#alignmentDisplay").text(character.alignment);
  });
}

function attachRaceListener(character){
  $("#charRace").on("change",function(){
    let charRace = $("#charRace").val();
    let subrace = '';
    switch (charRace){
    case 'high-elf': 
      charRace = 'elf';
      subrace = 'high-elf';
      break;
    case 'hill-dwarf':
      charRace = 'dwarf';
      subrace = 'hill-dwarf';
      break;
    case 'rock-gnome':
      charRace = 'gnome';
      subrace = 'rock-gnome';
      break;
    case 'lightfoot-halfling':
      charRace = 'halfling';
      subrace = 'lightfoot-halfling';
      break;
    default:
      subrace = "";
    }    
    DndService.getService("races", charRace)
      .then(function(response){
        if (response instanceof Error) {
          throw Error(`DnD API error: ${response.message}`);
        }
        let newRace = new Race(response.name,  response.speed, response.size, "");
        character.race = newRace;
        character.race.getLanguages(response);
        character.race.getAbilityBonuses(response);
        displayPointBuyBonuses(character);
        displayAbilityScores(character);
        displayCharacterStats(character);
        if(subrace !== ""){
          character.race.name = subrace;
          return DndService.getService("subraces", subrace);
        } else {
          displayCharacterHeader(character);
        }
      })
      .then((subraceResponse) => {
        if(subraceResponse instanceof Error) {
          throw Error (`DnD Api Error: ${subraceResponse.message}`);
        }
        character.race.getSubBonuses(subraceResponse, character.race.bonuses);
        displayCharacterHeader(character);
        displayPointBuyBonuses(character);
      })
      .catch(function(error) {
        console.log(error);
        displayErrors(error.message);
      });
  });
}

function attachClassListener(character){
  $("#charClass").on("change",function(){
    let charClass = $("#charClass").val();
    DndService.getService("classes", charClass)
      .then(function(response){
        if (response instanceof Error) {
          throw Error(`DnD API error: ${response.message}`);
        }
        let newClass = new CharClass(response.name, response.hit_die, response.proficiency_choices, response.proficiencies, response.saving_throws);
        character.addCharacterClass(newClass);
        displayCharacterHeader(character);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });  
  });
}

$(document).ready(function(){
  let character = new Character();

  attachCharacterListeners(character);
  attachIncreaseListeners(character);
  attachDecreaseListeners(character);
  attachRaceListener(character);
  attachClassListener(character);

  // Calculate Ability Modifiers
  // character.addAbilityModifier();
  // character.addArmorClass();
  
  //Next Button listener and ability score show button
  $("#charRace").click(() => {
    if ($("#charRace").find(":selected").val() !== "") {
      $("#nextButton").prop("disabled", false);
    }
  });

  $("#nextButton").on("click", () => {
    $("#abilityScoreSelection").slideDown();
  });

  $("#pointButton").click(function(){
    $("#pointBuyContainer").show();
    $("#standardArrayRadioContainer").hide();
    character.setPointBuyStart();
    displayPointBuyScore(character);
  });
  
  // finalize form
  $("#formOne").submit(function(){
    event.preventDefault();
    $("#formOne").hide();
    console.log(character);
  });
}); 