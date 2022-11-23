//WEB3 Fucntions
let provider, signer, instance, user, address;
const contractAddress = "0x68B7b3F278e9243003cC9c68bEA9D2cB62041B50";

async function login() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    user = provider.getSigner();
    address = await user.getAddress();
    instance = new ethers.Contract(contractAddress, abi, provider);
    signer = instance.connect(user);
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

async function mintAfterGame(tokenCount) {
    let _address = address;
    try{
        console.log("tokenCount", tokenCount);
        console.log("_address", _address);
        const tx = await signer.mint(_address, tokenCount);
        const receipt = await tx.wait();
        console.log(receipt);
        alert("Transaction complete! Block Hash:" + receipt.blockHash);
    } catch (error){
        alert("Transaction failed: " + error.message);
        console.log(error);
    };
}