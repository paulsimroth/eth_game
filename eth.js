//WEB3 Fucntions
let provider, signer, instance, user, address;
const tokenAddress = "0xaaeC249CcaDECf95e52b6fa4bB58704083D63c7D";
const marketAddress = "0x081F02d2ABD88956325F77C1eD677E5038c8E06E";

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
    try{
        const tx = await marketSigner.buyToken(id);
        const receipt = await tx.wait();
        console.log(receipt);
        alert("Transaction complete! Block Hash:" + receipt.blockHash);
    } catch (error){
        alert("Transaction failed: " + error.message);
        console.log(error);
    };
}