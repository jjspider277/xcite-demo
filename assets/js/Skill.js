
class Skill {
    constructor(baseAttribute, _skill, rank = 0) {
        this.baseAttribute = baseAttribute;
        this._skill = _skill;
        this.rank = rank;
    }

    setRank = function (rank) {
        this.rank = rank;
    }

    getRank = function (){
       return ranks[this.rank]
    }

    getSkill = function (){
        return this._skill;
    }
};






