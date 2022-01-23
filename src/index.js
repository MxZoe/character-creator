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
  $("#displayRace").text(`Race: ${character.race.name}, Speed: ${character.race.speed}, Size: ${character.race.size}, Languages: ${character.race.languages}`);
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

function displayPointBuyBonuses(character){
  $("#strBonus").text(character.race.bonuses.get('str'));
  $("#dexBonus").text(character.race.bonuses.get('dex'));
  $("#conBonus").text(character.race.bonuses.get('con'));
  $("#intBonus").text(character.race.bonuses.get('int'));
  $("#wisBonus").text(character.race.bonuses.get('wis'));
  $("#chaBonus").text(character.race.bonuses.get('cha'));
}
function displayScore(character){
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
function attachIncreaseListeners(character){
  Object.keys(character.abilityScores).forEach((score) => {
    $(`#${score}Up`).on("click", () => {
      character.increaseScore(score);
      displayScore(character);
      $("#pointBuyPoints").html(character.pointBuy);
    });
  });
}

function attachDecreaseListeners(character){
  Object.keys(character.abilityScores).forEach((score) => {
    $(`#${score}Down`).on("click", () => {
      character.decreaseScore(score);
      displayScore(character);
      $("#pointBuyPoints").html(character.pointBuy);
    });
  });
}

function displayAbilityScores(character) {
  Object.keys(character.abilityScores).forEach((abilityScore) => {
    $(`#${abilityScore}AbilityScore`).text(character.abilityScores[abilityScore]);
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
        displayAbilityScores(character);
        displayCharacterStats(character);
        if(subrace !== ""){
          character.race.name = subrace;
          return DndService.getService("subraces", subrace);
        } else {
          displayRace(character);
          displayBonuses(character);
          displayCharacterHeader(character);
          displayPointBuyBonuses(character);
        }
      })
      .then((subraceResponse) => {
        if(subraceResponse instanceof Error) {
          throw Error (`DnD Api Error: ${subraceResponse.message}`);
        }
        character.race.getSubBonuses(subraceResponse, character.race.bonuses);
        displayRace(character);
        displayBonuses(character);
        displayCharacterHeader(character);
        displayPointBuyBonuses(character);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
    displayScore(character);
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
        displayClass(character);
        displayCharacterHeader(character);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });  
  });
}
$(document).ready(function(){
  let character = new Character();
  let charClass = $("#charClass").val();
  let charRace = $("#charRace").val();
  let subrace = "";
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

  attachCharacterListeners(character);
  attachIncreaseListeners(character);
  attachDecreaseListeners(character);
  attachRaceListener(character);
  attachClassListener(character);

  character.alignment = $("#charAlignment").val();
  $("#alignmentDisplay").text(character.alignment);
  DndService.getService("races", charRace)
    .then(function(response){
      if (response instanceof Error) {
        throw Error(`DnD API error: ${response.message}`);
      }
      let newRace = new Race(response.name,  response.speed, response.size, "");
      character.race = newRace;
      character.race.getLanguages(response);
      character.race.getAbilityBonuses(response);
      displayAbilityScores(character);
      displayCharacterStats(character);
      if(subrace !== ""){
        return DndService.getService("subraces", subrace);
      } else{
        displayRace(character);
        displayBonuses(character);
      }
    })
    .then((subraceResponse) => {
      if(subraceResponse instanceof Error) {
        throw Error (`DnD Api Error: ${subraceResponse.message}`);
      }
      character.race.getSubBonuses(subraceResponse, character.race.bonuses);
      displayRace(character);
      displayBonuses(character);
    })
    .catch(function(error) {
      displayErrors(error.message);
    });
  DndService.getService("classes", charClass)
    .then(function(response){
      if (response instanceof Error) {
        throw Error(`DnD API error: ${response.message}`);
      }
      let newClass = new CharClass(response.name, response.hit_die, response.proficiency_choices, response.proficiencies, response.saving_throws);
      character.addCharacterClass(newClass);
      displayClass(character);
      displayCharacterHeader(character);
    })
    .catch(function(error) {
      displayErrors(error.message);
    });  

  $("#standardButton").click(function(){
    $("#standardArrayRadioContainer").show();
    $("#pointBuyContainer").hide();
    character.resetAbilityScores();
  });
  $("#pointButton").click(function(){
    $("#pointBuyContainer").show();
    $("#standardArrayRadioContainer").hide();
    character.setPointBuyStart();
    displayScore(character);
  });
  $("#formOne").submit(function(){
    event.preventDefault();
    // Create Character
    
    
    // Get Player Name, Character Name, & Alignment
    // let playerName = $("#playerName").val();
    // let characterName = $("#charName").val();
    // let alignment = $("#charAlignment").find(":selected").val();
    //  character.addPlayerName(playerName);
    //  character.addCharacterName(characterName);
    //  character.addAlignment(alignment);
    // Get Ability Scores
    /*
    character.abilityScores.str = parseInt($(`input[name="str"]:checked`).val());
    character.abilityScores.dex = parseInt($(`input[name="dex"]:checked`).val());
    character.abilityScores.con = parseInt($(`input[name="con"]:checked`).val());
    character.abilityScores.int = parseInt($(`input[name="int"]:checked`).val());
    character.abilityScores.wis = parseInt($(`input[name="wis"]:checked`).val());
    character.abilityScores.cha = parseInt($(`input[name="cha"]:checked`).val());
    */
    // Get Race and Class
    
    

      // Calculate Ability Modifiers
    character.addRacialBonuses();
    character.addAbilityModifier();
    console.log(character.abilityModifiers);
    character.addArmorClass();
    console.log(character.armorClass);
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