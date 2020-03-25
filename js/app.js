let deck = new OkiaDeck();

const config = {
    minNumberOfPlayers: 4,
    players: [],
    deck: deck
};

let game = new OkiaEngine(config);
game.join("ahmad");
game.join("jamal");
game.join("zaki");
game.join("salman");

