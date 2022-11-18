const contractAddress = 0xAf9169D7C299173870e9bcA0F9212AC20c485c4;

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

async function mintAfterGame(address, tokenCount) {
    try{
        const tx = await signer.mint(address, tokenCount);
        const receipt = await tx.wait();
        
    } catch (error){
        
        console.log(error);
    };
}