export default class Race {
  constructor(name, speed, size, languages){
    this.name = name;
    this.speed = speed;
    this.size = size;
    this.languages = languages;
    this.bonuses;
  }

  getAbilityBonuses(response){
    let abilityBonusMap = new Map([
      ['str', 0],
      ['dex', 0],
      ['con', 0],
      ['int', 0],
      ['wis', 0],
      ['cha', 0],
    ]);
    let abilities = response.ability_bonuses;
    abilities.forEach(function(element){
      abilityBonusMap.set(element.ability_score.index, element.bonus);
    });
    
    this.bonuses = abilityBonusMap;
  }
  
  getLanguages() {
    let languageString = "";
    this.languages.forEach(function(element){
      languageString = languageString + ", " + element.name;
    });
    return languageString;
  }
}