//WEB3 Fucntions
let provider, signer, instance, user, address;
const tokenAddress = "0x7884F80108e4ADa3bDe0BadB344185DaD207f97a";
const marketAddress = "0x4a7b4F4F6081840988256d5Edc28ba45DF53Dfb3";

async function login() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    user = provider.getSigner();
    address = await user.getAddress();

    instance = new ethers.Contract(tokenAddress, abi, provider);
    signer = instance.connect(user);
    
    marketInstance = new ethers.Contract(marketAddress, marketAbi, provider);
    marketSigner = marketInstance.connect(user);

    getUserItems(address);
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
            if(values[0] > 0){
                console.log("user has item 1");
            }
            if(values[1] > 0){
                console.log("user has item 2");
            }
            if(values[2] > 0){
                console.log("user has item 3");
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
