
const config = {
    minNumberOfPlayers: 4,
    players: [],
    deck: new OkiaDeck()
};

let game = new OkiaEngine(config);

game.join("ahmad");
game.join("jamal");
game.join("zaki");
game.join("salman");

game.restart();
game.status();
