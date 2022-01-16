class Character {
  constructor() {
    this.characterName = "";
    this.playerName = "";
    this.alignment = "";
    this.race = {};
    this.characterClass = {};
    this.hitpoints = 0;
    this.abilityScores = [];
    this.armorClass = 0;
    this.equipment = {};
  }
  // Add methods for constructor
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
  addAbilityScores(array) {
    this.abilityScores = array;
  }
  addArmorClass(armorClass) {
    this.armorClass = armorClass;
  }
  addEquipment(equipment) {
    this.equipment = equipment;
  }
  // Shortcut Methods 
  
}