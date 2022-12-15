//Variables
let cursors;
let knight;
let crates;

let coinTimer;
let coins;

let score = 0;
let scoreText;

let secondsLeft = 60;
let timeLeftText;
let timeLeftTimer;
let gameOver = false;
let coinsSent = false;

//changed by pump talisman
let COIN_GENERATION_INTERVALL = 4000;
//changed by super boots
let PLAYER_SPEED_VARIABLE = 200;
//changed by time warp cape
let GAME_SECONDS = 1000;

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
            gravity: {y:500},
            debug: false
        }
    }
};

//Calls login(), changes walletButton
login(function(){
    console.log("callback");
    walletButton.innerHTML = address;
    //Game
    const game = new Phaser.Game(config);
});

//Loading assets
//GAME PRELOAD
function gamePreload() {
    //Images loaded
    this.load.image("knight", "assets/knight.png");
    this.load.image("background", "assets/background.png");
    this.load.image("crate", "assets/crate.png");
    this.load.image("bitcoin", "assets/bitcoin.png");

    //Load running animation frames
    this.load.image("knight_runFrame_1", "assets/knight/run/Run (1).png");
    this.load.image("knight_runFrame_2", "assets/knight/run/Run (2).png");
    this.load.image("knight_runFrame_3", "assets/knight/run/Run (3).png");
    this.load.image("knight_runFrame_4", "assets/knight/run/Run (4).png");
    this.load.image("knight_runFrame_5", "assets/knight/run/Run (5).png");
    this.load.image("knight_runFrame_6", "assets/knight/run/Run (6).png");
    this.load.image("knight_runFrame_7", "assets/knight/run/Run (7).png");
    this.load.image("knight_runFrame_8", "assets/knight/run/Run (8).png");
    this.load.image("knight_runFrame_9", "assets/knight/run/Run (9).png");
    this.load.image("knight_runFrame_10", "assets/knight/run/Run (10).png");

    //Load idle animation frames
    this.load.image("knight_idleFrame_1", "assets/knight/idle/Idle (1).png");
    this.load.image("knight_idleFrame_2", "assets/knight/idle/Idle (2).png");
    this.load.image("knight_idleFrame_3", "assets/knight/idle/Idle (3).png");
    this.load.image("knight_idleFrame_4", "assets/knight/idle/Idle (4).png");
    this.load.image("knight_idleFrame_5", "assets/knight/idle/Idle (5).png");
    this.load.image("knight_idleFrame_6", "assets/knight/idle/Idle (6).png");
    this.load.image("knight_idleFrame_7", "assets/knight/idle/Idle (7).png");
    this.load.image("knight_idleFrame_8", "assets/knight/idle/Idle (8).png");
    this.load.image("knight_idleFrame_9", "assets/knight/idle/Idle (9).png");
    this.load.image("knight_idleFrame_10", "assets/knight/idle/Idle (10).png");
};

//initial setup logic
//GAME CREATE
function gameCreate() {
    //background
    this.add.image(400,250,"background");

    //Knight created, hitbox size set, knight scaled
    knight = this.physics.add.sprite(100,100,"knight");
    knight.body.setSize(400,600,10,0);
    knight.scaleX = 0.15;
    knight.scaleY = 0.15;

    //Floor created out of crates
    crates = this.physics.add.staticGroup();

    //Floor
    crates.create(40,560,"crate");
    crates.create(120,560,"crate");
    crates.create(200,560,"crate");
    crates.create(280,560,"crate");
    crates.create(360,560,"crate");
    crates.create(440,560,"crate");
    crates.create(790,560,"crate");

    //Platforms
    crates.create(200,280,"crate");
    crates.create(300,360,"crate");
    crates.create(490,460,"crate");
    crates.create(570,400,"crate");
    crates.create(710,510,"crate");
    crates.create(790,300,"crate");

    //animations
    this.anims.create({
        key: "knight_run",
        frames:[
            {key: "knight_runFrame_1"},
            {key: "knight_runFrame_2"},
            {key: "knight_runFrame_3"},
            {key: "knight_runFrame_4"},
            {key: "knight_runFrame_5"},
            {key: "knight_runFrame_6"},
            {key: "knight_runFrame_7"},
            {key: "knight_runFrame_8"},
            {key: "knight_runFrame_9"},
            {key: "knight_runFrame_10"}
        ],
        frameRate: 10,
        repeat: 1
    });

    this.anims.create({
        key: "knight_idle",
        frames:[
            {key: "knight_idleFrame_1"},
            {key: "knight_idleFrame_2"},
            {key: "knight_idleFrame_3"},
            {key: "knight_idleFrame_4"},
            {key: "knight_idleFrame_5"},
            {key: "knight_idleFrame_6"},
            {key: "knight_idleFrame_7"},
            {key: "knight_idleFrame_8"},
            {key: "knight_idleFrame_9"},
            {key: "knight_idleFrame_10"}
        ],
        frameRate: 10,
        repeat: 1
    });

    //Collider set for knight and floor
    this.physics.add.collider(crates, knight);

    //Score Text
    scoreText = this.add.text(6, 16, "Bitcoin Bag: 0", {fontSize:"32px", fill:"#000"});

    //Time Left Text
    timeLeftText = this.add.text(6, 56, secondsLeft + " Seconds left", {fontSize:"30px", fill:"#000"});

    //Keyboard inputs
    cursors = this.input.keyboard.createCursorKeys();

    //Timer for generating coins
    coinTimer = this.time.addEvent({
        delay: COIN_GENERATION_INTERVALL,
        callback: generateCoins,
        callbackScope: this,
        repeat: -1
    });

    //Timer for time left
    timeLeftTimer = this.time.addEvent({
        delay: GAME_SECONDS,
        callback: updateTimeLeft,
        callbackScope: this,
        repeat: -1
    });
};

async function updateTimeLeft() {
    if(gameOver){
        if(!coinsSent){
            coinsSent = true;
            await mintAfterGame(score);
        };
        return;
    };

    secondsLeft -= 1;
    timeLeftText.setText(secondsLeft + " Seconds left");

    if(secondsLeft <= 0){
        this.physics.pause();
        gameOver = true;
    }
};
    
//Generating Coins
function generateCoins() {
    coins = this.physics.add.group({
        key: "bitcoin",
        repeat: 1,
        setXY:{
            x: Phaser.Math.Between(0, 900),
            y: -50,
            stepX: Phaser.Math.Between(30, 100)
        }
    });

    coins.children.iterate(function(child){
    child.setBounceY(Phaser.Math.FloatBetween(0.3, 1.5))
    });

    this.physics.add.collider(coins,crates);
    this.physics.add.overlap(knight, coins, collectCoin, null, this);

};

function collectCoin(knight, coin){
    coin.disableBody(true, true);
    score++;
    scoreText.setText("Bitcoin Bag: " + score);
};

//Monitoring inputs and updating game
//GAME UPDATE
function gameUpdate() {
    if(cursors.left.isDown){
        knight.setVelocityX(-PLAYER_SPEED_VARIABLE);
        knight.play("knight_run", true);
        knight.flipX = true;
    } 
    else if(cursors.right.isDown){
        knight.setVelocityX(PLAYER_SPEED_VARIABLE);
        knight.play("knight_run", true);
        knight.flipX = false;
    }
    else{
        knight.setVelocityX(0);
        knight.play("knight_idle", true)
    }

    if(cursors.up.isDown && knight.body.touching.down) {
        knight.setVelocityY(-350);
    }
};