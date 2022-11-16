//Configuration of the game
const config = {
    width: 900,
    height: 600,
    type: Phaser.AUTO,

    scene:{
        preload: gamePreload,
        create: gameCreate,
        update: gameUpdate
    },

    physics:{
        default: "arcade",
        arcade:{
            gravity: {y:400},
            debug: true
        }
    }
};

//Loading assets
function gamePreload() {
    //Images loaded
    this.load.image("knight", "assets/knight.png");
    this.load.image("background", "assets/background.png");
    this.load.image("crate", "assets/crate.png");
};

//initial setup logic
function gameCreate() {
    //Knight created and scaled
    var knight = this.physics.add.sprite(100,100,"knight");
    knight.scaleX = 0.2;
    knight.scaleY = 0.2;

    //Floor created out of crates
    var crates = this.physics.add.staticGroup();
    crates.create(40,560,"crate");
    crates.create(120,560,"crate");
    crates.create(200,560,"crate");
    crates.create(280,560,"crate");
    crates.create(360,560,"crate");
    crates.create(440,560,"crate");

    //Collider set for knight and floor
    this.physics.add.collider(crates, knight);
};

//Monitoring imputs and updating game
function gameUpdate() {

};

//Game
const game = new Phaser.Game(config);