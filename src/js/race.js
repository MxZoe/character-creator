export default class Race {
  constructor(name, speed, size, subrace){
    this.name = name;
    this.speed = speed;
    this.size = size;
    this.languages;
    this.subrace = subrace;
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
    for(let i=0; i < abilities.length;i++){
      abilityBonusMap.set(abilities[i].ability_score.index, abilities[i].bonus);
    }
    this.bonuses = abilityBonusMap;
  }
  
  getSubBonuses(response){
    this.bonuses.set(response.ability_bonuses[0].ability_score.index, response.ability_bonuses[0].bonus);
  }

  getLanguages(response){
    let languages = response.languages;
    let languageString = "";
    for(let i=0;i<languages.length;i++){
      languageString = languageString + ", " + languages[i].name;
    }
    this.languages = languageString;
  }
}
