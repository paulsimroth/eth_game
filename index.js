//configuration of the game
const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,

    scene:{
        preload: gamePreload,
        create: gameCreate,
        update: gameUpdate
    },

    physics:{
        default: "arcade",
        arcade:{
            gravity: {y:200},
            debug: false
        }
    }
};

//loading assets
function gamePreload() {
    console.log("gamePreload");
    this.load.image("knight", "assets/knight.png");
    this.load.image("background", "assets/background.png");
};

//initial setup logic
function gameCreate() {
    console.log("gameCreate");
    this.physics.add.sprite(100,100,"knight");
};

//monitoring imputs and updating game
function gameUpdate() {
    console.log("gameUpdate");
};

const game = new Phaser.Game(config);