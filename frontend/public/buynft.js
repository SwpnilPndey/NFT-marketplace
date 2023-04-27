const connectmetamask = async () => {
    let account;
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        let shortHandAccount = account.slice(0, 4) + "..." + account.slice(-4);
        document.getElementById("metamask-buynft").innerHTML = shortHandAccount;
        document.getElementById("metamask-buynft").style.backgroundColor = "green";
    }
    else {
        alert("Kindly install metamask")
    }
    };

const buyNFT=async()=> {
    const contractABI = await fetch("/NFTMktplace.json");
    const abidata = await contractABI.json();
    const contractAddress = await fetch("/Address.json");                        
    const addressdata = await contractAddress.json();
    const ABI = abidata.abi;
    const Address = addressdata.address;
    const buyToken=document.getElementById("form-NFTtokenBuy").value;

    console.log(buyToken);
    // console.log(ABI);
    // console.log(Address);


    window.web3 = new Web3(window.ethereum);
    window.contract = new window.web3.eth.Contract(ABI, Address);

    let account;
    const accounts=await ethereum.request({method:"eth_requestAccounts"});
    account=accounts[0];
    let token=await window.contract.methods.listedNFTs(buyToken).call();

    console.log(token);

    let totalPrice=Number(1000)+Number(token.price);
    console.log(totalPrice);
    await window.contract.methods.buyNFT(buyToken).send({value: totalPrice, from: account});
    
    console.log(account);
}