class OkiaEngine {
    constructor(config = {
        minNumberOfPlayers, 
        deck, 
        players}) {
        
            this.config = config;
            this.pause();

    }

    join(player) {
        let canJoin = true;

        // player maybe a string (a name) or a Player object
        if(typeof player === "string") {
            console.log(`converting string to player(${player})`);
            player = new Player(player);
        }

        if(player instanceof Player) {
            if(this.config.players.length < this.config.minNumberOfPlayers) {
                for(let p of this.config.players) {
                    if (p.name === player.name) {
                        console.error(`Player with name ${player.name} alreay exists`);
                        canJoin = false;
                        break;
                    } 
                }
                if(canJoin) {
                    console.log(`Player with name ${player.name} joined...`);
                    this.config.players.push(player);
                    canJoin = true;
                }
                
            } else {
                console.error(`OkiaEngine.join: can't join more than ${this.config.minNumberOfPlayers} players`);
                canJoin = false;
            }

        }

        return canJoin;
        
    }

    leave(name) {
        for(let i=0; i<this.config.players.length; i++) {
            let p = this.config.players[i];
            if(p.name === name) {
                this.config.players.splice(i, 1);
                
                this.pause();
                console.warn(`Player [${p.name}] left the game`);
                return true;
                
            }
        }
        console.error(`Player with name ${name} is not part of this game`);
        return false;

    }

    status() {
        console.table(this.config);
        return this.config;
    }
    restart() {
        if(this.config.players.length !== this.config.minNumberOfPlayers) {
            console.error(`can't restart with ${this.config.players.length} players`);
            return false;
        }

        this.pause();
        this.config.deck = new OkiaDeck();
        this.config.deck.shuffle();
        for(let i=0; i<this.config.minNumberOfPlayers; i++) {
            
            this.config.players[i].cards = this.config.deck.cards.splice(0,13);
        }
        this.resume();
        

    }
    pause() {
        if(!this.config.paused) {
            console.warn("game paused");
            this.config.paused = true;
        }
        
    }
    resume() {
        if(this.config.paused) {
            if(this.config.players.length===this.config.minNumberOfPlayers) {
                this.config.paused = false;
                console.warn("game resumed.");
            } else {
                console.error(`can't resume with less than ${this.config.minNumberOfPlayers} players`);
            }
            
        } else {
            console.error("game is already resumed");
        }
        
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
                    this.cards.push(new Card({color:"zat", value: 99}));
                } else {
                    this.cards.push(new Card({color:c, value: v}));
                }
                
            }
        }

    }

    shuffle() {
        let shuffled = [];
        while(shuffled.length<52) {
            let i = parseInt(Math.random() * this.cards.length);
            shuffled.push(this.cards.splice(i,1)[0]);
        }
        this.cards = shuffled;
    }

    print() {
        this.cards.forEach(card => card.print());
    }
}

class Card {
    constructor({color, value}) {
        this.color = color;
        this.value = value;
        this.code = this.color.substr(0,1) + String(this.value).padStart(2,"0");
    }
    print() {
        console.log(this.color.substr(0,1) + "" + this.value);
    }
}