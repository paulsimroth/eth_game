//WEB3 Fucntions
let provider, signer, instance, user, address;
const tokenAddress = "0xCBDBf349B7FE4015DbDc3c6d9DdDD571c4CE1c46";
const marketAddress = "0xA1153A429B8ABFcDf9d8c0b32a05B787ecd236cF";

async function login() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    user = provider.getSigner();
    address = await user.getAddress();

    instance = new ethers.Contract(tokenAddress, abi, provider);
    signer = instance.connect(user);
    
    marketInstance = new ethers.Contract(marketAddress, marketAbi, provider);
    marketSigner = marketInstance.connect(user);
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

async function buy(id) {
    let value = 0;

    if (id == 1){
        value = 100000000000000;
    }
    else if (id == 2){
        value = 200000000000000;
    }
    else if (id == 3){
        value = 300000000000000;
    };

    try{
        const tx = await marketSigner.buyToken(id, value);
        const receipt = await tx.wait();
        console.log(receipt);
        alert("Transaction complete! Block Hash:" + receipt.blockHash);
    } catch (error){
        alert("Transaction failed: " + error.message);
        console.log(error);
    };
}