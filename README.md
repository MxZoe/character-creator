MVP: Make a character creator that allows the user to add their name, race, class, background and ability scores.
Stretch goal: Add proficiencies
Stretch goal: Let the player add spells and starting equipment
Stretch goal: add descriptions to proficiencies, spells and equipment
Stretch goal: let the player export their character to a pdf
Stretch goal: Let the player choose their starting level and add the appropriate hit points, ability score increases and spells/equipment
Stretch goal: Let the player add custom options for race, class and background


Zoe changelog 01/20
to character.js:
  added this.pointBuy attribute;
  I had a hard time getting the dot notion to work for a given attribute used as an argument. i.e. increaseScore(argument) would increase the strength score by 1 with an argument of "str" but i was unable to get character.abilitybonus.argument to work. So I created this.abilities to be a map like the bonus map.
  Added a method to set all stats to 8 and the this.pointBuy to 27.
  Added a method to set all stats to 0.
  Added increase and decrease methods to use with pointbuy.

to index.html:
  added buttons to show different stat generation methods
  added the point buy html

to styles.css
  hid standardarray and point buy sections by default

to index.js
  added code for the new buttons (excluding the roll dice button)
  added attacheventlisteners for increase and decrease buttons
  added a display method for point buy

Got stuck on:
 couldn't get the character.pointbuy to display for some reason in the displayScore function
 When the increase/decrease buttons are clicked it submits the form for some reason

Further thoughts:
 We had discussed updating character whenever a field changed which would eliminate the need for a form if we wanted. We could organize it with an attachListeners function like I do with the increase and decrease buttons.
