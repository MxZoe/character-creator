import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/styles.css';
import DndService from "./dnd-service.js";

function displayRace(response){
  $("#displayRace").text(`${response.name}`);
  //$("#displayRace").html(`${response.ability_bonuses}`);
}

function displayClass(response){
  $("#displayClass").text(`${response.name}, hit die: ${response.hit_die}`);
}


function displayAbilityBonus(response){
  let abilityBonusMap = new Map([
    ['str', 0],
    ['dex', 0],
    ['con', 0],
    ['int', 0],
    ['wis', 0],
    ['cha', 0],
  ]);
  const bonusArray = response.ability_bonuses

  $("#displayAbilityBonus").html();
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function(){
  $("#formOne").submit(function(){
    event.preventDefault();
    let charClass = $("#charClass").val();
    let charRace = $("#charRace").val();
    DndService.getService("classes", charClass)
    .then(function(dndResponse){
      if (dndResponse instanceof Error) {
        throw Error(`DnD API error: ${dndResponse.message}`);
      }
      displayClass(dndResponse);
    })
    .catch(function(error) {
      displayErrors(error.message)
    });
    DndService.getService("races", charRace)
    .then(function(dndResponse){
      if (dndResponse instanceof Error) {
        throw Error(`DnD API error: ${dndResponse.message}`);
      }
      displayRace(dndResponse);
    })
    .catch(function(error) {
      displayErrors(error.message)
    });
  })
});