//WEB3 Fucntions
let provider, signer, instance, user, address;
const contractAddress = "0xeF1466fFC8FcA1b31BDd65019A323CA911E52825";

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
    console.log("_address", _address);
    try{
        const tx = await signer.mint(_address, tokenCount);
        const receipt = await tx.wait();
        console.log(receipt);
        alert("Transaction complete: " + receipt);
    } catch (error){
        alert("Transaction failed: " + error.message);
        console.log(error);
    };
}