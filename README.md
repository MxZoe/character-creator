MVP: Make a character creator that allows the user to add their name, race, class, background and ability scores.
Stretch goal: Add proficiencies
Stretch goal: Let the player add spells and starting equipment
Stretch goal: add descriptions to proficiencies, spells and equipment
Stretch goal: let the player export their character to a pdf
Stretch goal: Let the player choose their starting level and add the appropriate hit points, ability score increases and spells/equipment
Stretch goal: Let the player add custom options for race, class and background


//problems with subraces
in order to get the ability bonus of a subrace we must check the race for a subrace, use that subrace (response. subraces.index) to make an api call and then get the ability_bonuses from the json file. We must then add the bonus to the existing Race object's Race.bonus (which is a map ["str": 2] etc). The issues we are having are:
When a race does not have a subrace it will return an error (cannot read properties of undefined: index)
-Solution? check if subraces is not an empty array first.
When a race does have a subrace we get a 404 error indicating that the url we generate from the subraces.index is wrong in an unknown way.  

let subrace = newRace.subrace;
      
      if(newRace.subrace !== "none"){
        DndService.getService("subraces", subrace)
        .then(function(response){
          if (response instanceof Error) {
            throw Error(`DnD API error: ${response.message}`);
          }
         $(".show-errors").text(response);
        })
        .catch(function(error) {
          displayErrors(error.message);
        });
      }