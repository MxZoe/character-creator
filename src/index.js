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
  let newClass = new CharClass(response.name, response.hit_die, response.proficiency_choices, response.proficiencies, response.saving_throws)
  return newClass;
}

function makeRace(response){
  let newRace = new Race(response.name, response.speed, response.size, response.languages)
  return newRace;
}

function getLanguages(languageResponse) {
  let languageString = ""
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
  $("#displayAbilityBonus").text(`STR: ${race.bonuses.get("str")} DEX: ${race.bonuses.get("dex")}  CON: ${race.bonuses.get("con")}  INT:${race.bonuses.get("int")}  WIS:${race.bonuses.get("wis")}  CHA: ${race.bonuses.get("cha")} `)
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}


$(document).ready(function(){
  $("#formOne").submit(function(){
    event.preventDefault();
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
      displayErrors(error.message)
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
      displayErrors(error.message)
    });
  })
});