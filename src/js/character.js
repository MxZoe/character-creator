class Character {
  constructor(characterName) {
    this.characterName = "";
    this.playerName = "";
    this.alignment = "";
    this.race = {};
    this.class = {};
    this.hitpoints = 0;
    this.abilityScores = [];
    this.armorClass = 0;
  }
  addAbilityScores(array) {
    this.abilityScores = array;
  }
}