class OkiaEngine {
    constructor(config = {
        minNumberOfPlayers, 
        deck, 
        players}) {
        
            this.config = config;
            this.config.started = false;

    }

    join(player) {
        let canJoin = false;

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
                console.log(`Player with name ${player.name} joined...`);
                this.config.players.push(player);
                canJoin = true;
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
                console.warn(`Player [${p.name}] left the game`);
                this.pause();
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

    pause() {
        if(this.config.started) {
            console.warn("game paused");
            this.config.started = false;
        }
        
    }
    start() {
        if(!this.config.started) {
            if(this.config.players.length===this.config.minNumberOfPlayers) {
                this.config.started = true;
                console.log("game started.");
            } else {
                console.error(`can't start with less than ${this.config.minNumberOfPlayers} players`);
            }
            
        } else {
            console.error("game is already started");
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