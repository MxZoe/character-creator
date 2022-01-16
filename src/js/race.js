export default class Race {
  constructor(name, speed, size, languages) {
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
    let i = 0;
    for (let [stat, value] of abilityBonusMap) {
      if (stat === response.ability_bonuses[i].ability_score.index){
        abilityBonusMap.set(stat, response.ability_bonuses[i].bonus);
        console.log(stat, value, i);
      }
      i++;
    }
    this.bonuses = abilityBonusMap;
  }
  
}

