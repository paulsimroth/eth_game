//WEB3 Functions
//Variables for Web3 functions
let provider, coinSigner, tokenSigner, marketSigner, coinInstance, tokenInstance, marketInstance, user, address;

//Contract Addresses
const coinAddress = "0x5365B6Db506c7b817F89e36c79961a71345Adc78";
const tokenAddress = "0x990baB8A26aA2902BB9BBE71c9C92823027F8c40";
const marketAddress = "0x30fba7557c38C140afEA8592A5Be966dd918617A";

//Login function includes fetching items and coins from user
async function login(callback) {
    //Initial setup
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    user = provider.getSigner();
    address = await user.getAddress();
    //Instance for Coin
    coinInstance = new ethers.Contract(coinAddress, coinAbi, provider);
    coinSigner = coinInstance.connect(user);
    //Instancee for Token
    tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, provider);
    tokenSigner = tokenInstance.connect(user);
    //Instance for Marketplace
    marketInstance = new ethers.Contract(marketAddress, marketAbi, provider);
    marketSigner = marketInstance.connect(user);

    //once logged in users items and coins are retrieved
    await getUserItems(address);
    await getCoins(address);

    //User must give approval to market contract to sell GameCoins for Items
    try{
        let approval = await coinSigner.approve(marketAddress, 100000);
        let receipt = await approval.wait();
        alert("Transaction complete! TX Hash:" + receipt.transactionHash);
    } catch (error){
        alert("Approval failed: " + error);
    };

    //callback
    callback();
};

//Login Button on website
const walletButton = document.querySelector('#enableWeb3');
walletButton.addEventListener('click', async() => {
    //Will Start the metamask extension
    if (window.ethereum) { 
        walletButton.innerHTML = "Connecting";
        await login();
        walletButton.innerHTML = address;
    } else {
        walletButton.innerHTML = `<p class="error">FAILED TO CONNECT WEB3; Install Web3 Provider!</p>`;
    };
});

//Mint GameCoins after the game is finished
async function mintAfterGame(tokenCount) {
    let _address = address;
    console.log("mintAfterGame _address", _address);
    try{
        const tx = await coinSigner.mint(_address, tokenCount);
        const receipt = await tx.wait();
        alert("Transaction complete: " + receipt.blockHash);
    } catch (error){
        alert("Transaction failed: " + error.message);
    };
};

//Retrieving users GameCoin balance
const coinBalance = document.querySelector('.balance');
async function getCoins(address) {
    try{
        const tx = await coinSigner.balanceOf(address);
        coinBalance.innerHTML = `<p>Your Balance of the GameCoin is: ${tx} GCT</p>`;
    } catch (error){
        alert("Transaction failed: " + error.message);
    };
};

//Retrieve Items held by user
async function getUserItems(address) {
    console.log("getUserItems", address)
    try{
        const tokenCheck1 = await tokenSigner.balanceOf(address, 1);
        const tokenCheck2 = await tokenSigner.balanceOf(address, 2);
        const tokenCheck3 = await tokenSigner.balanceOf(address, 3);
        const tokenReceipt = await Promise.all([tokenCheck1, tokenCheck2, tokenCheck3]).then(values => {
            
            const numberOfTalismans = values[0];
            const numberOfBoots = values[1];
            const numberOfCapes = values[2];
            
            //Item effects on game behaviour set
                if(numberOfTalismans > 0){
                    COIN_GENERATION_INTERVALL = COIN_GENERATION_INTERVALL * Math.pow(0.75, numberOfTalismans);
                    console.log("COIN_GENERATION_INTERVALL", COIN_GENERATION_INTERVALL);
                }
                if(numberOfBoots > 0){
                    PLAYER_SPEED_VARIABLE = PLAYER_SPEED_VARIABLE * Math.pow(1.3, numberOfBoots);
                    console.log("PLAYER_SPEED_VARIABLE", PLAYER_SPEED_VARIABLE);
                }
                if(numberOfCapes > 0){
                    GAME_SECONDS = GAME_SECONDS * Math.pow(1.5, numberOfCapes);
                    console.log("GAME_SECONDS", GAME_SECONDS);
                }
        });
        
    } catch (error){
        alert("getUserItems failed: " + error.message);
    };
};

//Function Buy items with GameCoin
async function buy(id) {
    let value = 0

    if (id == 1){
        value = 10
    }
    else if (id == 2){
        value = 20
    }
    else if (id == 3){
        value = 30
    };

    try{
        const tx = await marketSigner.buyToken(id, value);
        const receipt = await tx.wait();
        alert("Transaction complete! TX Hash:" + receipt.transactionHash);
    } catch (error){
        alert("Transaction failed: " + error);
    };
};