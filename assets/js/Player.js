
class Player {
    constructor(name) {
        this.name = name;
        this.playerAvatar = "https://api.adorable.io/avatars/87/aboddtt@adorable.iodd.pngCo" + Math.floor(Math.random() * 10);
        this.damageTaken = 0;
        this.baseAttributes = {
            strength: 0,
            dexterity: 0,
            mind: 0,
            presence: 0
        },
        this.skills = {};
        this.setBaseAttribute("mind");
       
        this.updateAttributes();
    }

    getBaseAttribute = function () {
        return this.selectedBaseAttribute;
    }

    setBaseAttributeValue(value) {
        this.baseAttributes[this.getBaseAttribute()] = value;
        this.updateAttributes();


    }

    updateAttributes() {
        this.updateCombatAttributes();
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    updateCombatAttributes() {
        this.combatAttributes = {
            vitality: this.getVitality(),
            evasion: this.getEvasion(),
            armor: this.getArmor(),
            alacrity: this.getAlacrity(),
            tenacity: this.getTenacity(),
            power: this.getPower()
        }
    }

    getVitality() {
        return 3 + this.baseAttributes.strength - this.getDamage();
    }

    getEvasion() {
        return 10 + this.baseAttributes.dexterity;
    }

    getArmor() {
        return 10 + this.baseAttributes.dexterity;
    }

    getAlacrity() {
        return this.baseAttributes.dexterity + this.baseAttributes.mind;
    }

    getTenacity() {
        return 1 + this.baseAttributes.presence;
    }
    getPower() {
        return 0;
    }

    setVitality(vitality) {
        if (this.combatAttributes["vitality"] - vitality <= 0) {
            this.combatAttributes["vitality"] = 0;
        };
        this.combatAttributes["vitality"] = vitality;
        this.combatAttributes(vitality);
    }

    setDamage(timesOfDamageTaken) {
        this.damageTaken = timesOfDamageTaken;
        this.updateCombatAttributes();
    }

    getDamage() {
        return this.damageTaken;
    }
    getAvatar() {
        return this.playerAvatar;
    }

    setAvatar(avatar) {
        this.playerAvatar = avatar;
    }

    setBaseAttributes(baseAttrs) {
        this.baseAttributes = baseAttrs
    }
    setCombatAttributes(combatAttrs) {
        this.combatAttributes = combatAttrs;
    }
    
    addSkill(skill){
      let skillObj = new Skill(this.getBaseAttribute(),skill)
      this.skills[skill] = skillObj;
    }

    updateSkill(_skill){
        if (this.baseAttributes[this.selectedBaseAttribute] == 0) {
            alert("Please train your base attribute.");
        }
        let level = this.getSkills()[_skill].getRank().level + 1;
        if (level <= this.baseAttributes[this.selectedBaseAttribute]){

            //because we only have 6 ranks.. 
            if (level > 5){
                alert("You reached the last rank.")
                return;
            }
            this.getSkills()[_skill].setRank(level);
            console.log(this.getSkills()[_skill].getRank(),level);
        }
    }
    updateSkills(){
      let skills = Skillset[this.selectedBaseAttribute.toUpperCase()];
      this.skills = [];
      skills.forEach(skill => {
        this.addSkill(skill);
      });
    }

    getSkills(){
        return this.skills;
    }

    setBaseAttribute(attr) {
        this.selectedBaseAttribute = attr;
        this.updateAttributes();
        this.updateSkills();
    }

};
