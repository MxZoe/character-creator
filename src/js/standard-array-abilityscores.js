function CreateAbilityScores(scores) {
  let abilityScores = {};
  abilityScores.str = scores[0];
  abilityScores.dex = scores[1];
  abilityScores.con = scores[2];
  abilityScores.int = scores[3];
  abilityScores.wis = scores[4];
  abilityScores.cha = scores[5];
  return abilityScores;
}

// Experiental Functions
function isDuplicate(previousSelections, newSelection) {
  return (previousSelections.includes(newSelection)) ? true : false;
}


if (!isDuplicate(currentScoresArray, currentlySelected)) {
  currentScoresArray.push(currentlySelected);
}
