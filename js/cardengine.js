class OkiaEngine {
    constructor(config = {
        minNumberOfPlayers, 
        deck, 
        players}) {
        this.config = config;

    }

    join(player) {
        if(this.config.players.length < this.config.minNumberOfPlayers) {
            for(let p of this.config.players) {
                if (p.name === player.name) {
                    console.error(`Player with name ${player.name} alreay exists`);
                    return false;
                } 
            }
            this.config.players.push(player);
        } else {
            console.error(`OkiaEngine.join: can't join more than ${this.config.minNumberOfPlayers} players`);
        }
    }
    leave(name) {
        for(let i=0; i<this.config.players.length; i++) {
            let p = this.config.players[i];
            if(p.name === name) {
                this.config.players.splice(i, 1);
                return true;
            }
        }
        console.error(`Player with name ${name} is not part of this game`);
        return false;

    }
    getStatus() {
        return this.config;
    }
}

class Player {
    constructor(name) {
        this.name = name;
    }
}
class OkiaDeck {
    constructor() {
        this.cards = [];
        let colors = ["red", "green", "blue", "yellow"];
        for(let c of colors) {
            for(let v=0; v<13; v++) {
                if(c==="yellow" && v===0) {
                    this.cards.push(new Card({color:"black", value: 99}));
                } else {
                    this.cards.push(new Card({color:c, value: v}));
                }
                
            }
        }

    }
}

class Card {
    constructor(config = {color, value}) {
        this.config = config;
    }
}