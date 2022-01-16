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

function isStandardArray(array) {
  array.sort((a, b) => a - b);
  const standardArray = new Set([8, 10, 12, 13, 14, 15]);
  return (array === standardArray) ? true : false;
}
// next step make button create array for the function