export default class Race {
  constructor(name, speed, size, subrace, languages){
    this.name = name;
    this.speed = speed;
    this.size = size;
    this.languages = languages;
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
    abilities.forEach(function(element){
      abilityBonusMap.set(element.ability_score.index, element.bonus);
    });

    
    this.bonuses = abilityBonusMap;
  }
  
  getSubBonuses(response, abilityBonusMap){
    let abilities = response.ability_bonuses;
    abilities.forEach(function(element){
      let bonus = abilityBonusMap.get(element.ability_score.index);
      bonus += element.bonus;
      abilityBonusMap.set(element.ability_score.index, bonus);
    });

    
    this.bonuses = abilityBonusMap;
  }

}





