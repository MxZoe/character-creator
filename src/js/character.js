export default class Character {
  constructor() {
    this.characterName = "";
    this.playerName = "";
    this.alignment = "";
    this.race = {};
    this.characterClass = {};
    this.hitpoints = 0;
    this.abilityScores = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0
    };
    this.armorClass = 0;
    this.equipment = {};
  }
  // Adding methods for constructor
  addCharacterName(characterName) {
    this.characterName = characterName;
  }
  addPlayerName(playerName) {
    this.playerName = playerName;
  }
  addAlignment(alignment) {
    this.alignment = alignment;
  }
  addRace(race) {
    this.race = race;
  }
  addCharacterClass(characterClass) {
    this.characterClass = characterClass;
  }
  addHitPoints(hitpoints) {
    this.hitpoints = hitpoints;
  }
  addArmorClass(armorClass) {
    this.armorClass = armorClass;
  }
  addEquipment(equipment) {
    this.equipment = equipment;
  }
  addRacialBonuses() {
    this.abilityScores.str += this.race.bonuses.get("str");
    this.abilityScores.str += this.race.bonuses.get("dex");
    this.abilityScores.str += this.race.bonuses.get("con");
    this.abilityScores.str += this.race.bonuses.get("int");
    this.abilityScores.str += this.race.bonuses.get("wis");
    this.abilityScores.str += this.race.bonuses.get("cha");
  }
  // Shortcut Methods 
  characterStepOne(characterName, playerName, alignment) {
    this.addCharacterName(characterName);
    this.addPlayerName(playerName);
    this.addAlignment(alignment);
  }
}