//WEB3 Functions
let provider, coinSigner, tokenSigner, marketSigner, coinInstance, tokenInstance, marketInstance, user, address;
const coinAddress = "0x478C55D09fCCFd1aeA6547d2a1FE1550C54209FE";
const tokenAddress = "0x7884F80108e4ADa3bDe0BadB344185DaD207f97a";
const marketAddress = "0x4a7b4F4F6081840988256d5Edc28ba45DF53Dfb3";

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

    //once logged in users items are retrieved
    await getUserItems(address);
    //callback
    callback();
};

const walletButton = document.querySelector('#enableWeb3');
walletButton.addEventListener('click', async() => {
    //Will Start the metamask extension
    if (window.ethereum) { 
        walletButton.innerHTML = "Connecting";
        await login();
        walletButton.innerHTML = address;
    } else {
        walletButton.innerHTML = "FAILED TO CONNECT WEB3; Install Web3 Provider!";
    };
});

async function getUserItems(address) {
    console.log(address)
    try{
        const tokenCheck1 = await signer.balanceOf(address, 1);
        const tokenCheck2 = await signer.balanceOf(address, 2);
        const tokenCheck3 = await signer.balanceOf(address, 3);
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
        console.log(error);
    };
};

async function buy(id) {
    const options = {
        value: 0
    };

    if (id == 1){
        options.value = ethers.utils.parseEther("0.0001")
    }
    else if (id == 2){
        options.value = ethers.utils.parseEther("0.0002")
    }
    else if (id == 3){
        options.value = ethers.utils.parseEther("0.0003")
    };

    try{
        const tx = await marketSigner.buyToken(id, options);
        const receipt = await tx.wait();
        console.log(receipt);
        alert("Transaction complete! TX Hash:" + receipt.transactionHash);
    } catch (error){
        alert("Transaction failed: " + error.message);
        console.log(error);
    };
};

async function mintAfterGame(tokenCount) {
    let _address = address;
    console.log("_address", _address);
    try{
        const tx = await coinSigner.mint(_address, tokenCount);
        const receipt = await tx.wait();
        console.log(receipt);
        alert("Transaction complete: " + receipt);
    } catch (error){
        alert("Transaction failed: " + error.message);
        console.log(error);
    };
}