//WEB3 Fucntions
let provider, signer, instance, marketInstance, user, address;
const contractAddress = "0x7BEd2969e6760c6c33B42949F16554c7132C743a";

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
    var _address = address;
    try{
        const tx = await signer.mint(_address, tokenCount);
        const receipt = await tx.wait();
        console.log(receipt);
        alert("Transaction complete: " + receipt);
    } catch (error){
        alert("Transaction failed: " + error);
        console.log(error);
    };
}