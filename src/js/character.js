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
    this.abilityModifiers = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0
    };
    this.armorClass = 0;
    this.equipment = {};
    this.pointBuy = 27;
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

  addAbilityModifier() {
    Object.keys(this.abilityScores).forEach((score) => {
      const mod = Math.floor((this.abilityScores[score] - 10)/2);
      this.abilityModifiers[score] = mod;
    });
  }

  addArmorClass() {
    this.armorClass = this.abilityModifiers.dex + 10;
  }
  addEquipment(equipment) {
    this.equipment = equipment;
  }

  setPointBuyStart(){
    this.abilityScores.str = 8;
    this.abilityScores.dex = 8;
    this.abilityScores.con = 8;
    this.abilityScores.int = 8;
    this.abilityScores.wis = 8;
    this.abilityScores.cha = 8;
  }

  resetAbilityScores(){
    this.abilityScores.str = 0;
    this.abilityScores.dex = 0;
    this.abilityScores.con = 0;
    this.abilityScores.int = 0;
    this.abilityScores.wis = 0;
    this.abilityScores.cha = 0;
  }

  increaseScore(ability){
    if( this.abilityScores[ability] < 13 && this.pointBuy > 0){
      this.abilityScores[ability]++;
      this.pointBuy--;
    } else if (this.abilityScores[ability] >= 13 && this.abilityScores[ability] < 15 && this.pointBuy > 1){
      this.abilityScores[ability]++;
      this.pointBuy -= 2;
    } else if(this.pointBuy === 0){
      alert("you are out of points!");
    } else{
      alert("Your ability score cannot exceed 15 (before racial modifiers)");
    }
  }

  decreaseScore(ability){
    if(this.abilityScores[ability] >= 9){
      if(this.abilityScores[ability] <= 13){
        this.abilityScores[ability]--;
        this.pointBuy++;
      }else if(this.abilityScores[ability] > 13){
        this.abilityScores[ability]--;
        this.pointBuy += 2;
      }
    } else{
      alert("You cannot have a score below 8");
    }
  }

  // Shortcut Methods 
  characterStepOne(characterName, playerName, alignment) {
    this.addCharacterName(characterName);
    this.addPlayerName(playerName);
    this.addAlignment(alignment);
  }

}