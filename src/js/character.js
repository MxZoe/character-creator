export default class Character {
  constructor() {
    this.characterName = "";
    this.playerName = "";
    this.alignment = "";
    this.race = {};
    this.characterClass = {};
    this.hitpoints = 0;
    this.abilities = new Map([
      ['str', 0],
      ['dex', 0],
      ['con', 0],
      ['int', 0],
      ['wis', 0],
      ['cha', 0],
    ]);
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
  addArmorClass(armorClass) {
    this.armorClass = armorClass;
  }
  addEquipment(equipment) {
    this.equipment = equipment;
  }
  addRacialBonuses() {
    this.abilityScores.str += this.race.bonuses.get("str");
    this.abilityScores.dex += this.race.bonuses.get("dex");
    this.abilityScores.con += this.race.bonuses.get("con");
    this.abilityScores.int += this.race.bonuses.get("int");
    this.abilityScores.wis += this.race.bonuses.get("wis");
    this.abilityScores.cha += this.race.bonuses.get("cha");
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

  increaseScore(abilityKey){
    let scoreValue = this.abilities.get(abilityKey);
    if( scoreValue < 13 && this.pointBuy > 0){
      scoreValue++;
      this.abilities.set(abilityKey, scoreValue);
      this.pointBuy--;
    } else if (scoreValue >= 13 && scoreValue < 15 && this.pointBuy > 1){
      scoreValue++;
      this.abilities.set(abilityKey, scoreValue);
      this.pointBuy -= 2;
    } else if(this.pointBuy === 0){
      alert("you are out of points!");
    } else{
      alert("Your ability score cannot exceed 15 (before racial modifiers)");
    }
  }

  decreaseScore(abilityKey){
    let scoreValue = this.abilities.get(abilityKey);
    if(scoreValue >= 9){
      if(scoreValue <= 13){
        scoreValue--;
        this.abilities.set(abilityKey, scoreValue);
        this.pointBuy++;
        
      }else if(scoreValue > 13){
        scoreValue--;
        this.abilities.set(abilityKey, scoreValue);
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