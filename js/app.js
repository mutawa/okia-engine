let deck = new OkiaDeck();

const config = {
    minNumberOfPlayers: 4,
    players: [],
    deck: deck
};

let game = new OkiaEngine(config);
game.join(new Player("ahmad"));
game.join(new Player("ali"));
game.join(new Player("zaki"));
game.join(new Player("jawad"));
