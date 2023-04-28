window.onload = function() {
    let account=localStorage.getItem("account");
    console.log(account);
    if(localStorage.getItem("buttonClicked") === "true") {
    let shortHandAccount = account.slice(0, 4) + "..." + account.slice(-4);
    document.getElementById("metamask-buynft").innerHTML = shortHandAccount;
    document.getElementById("metamask-buynft").style.backgroundColor = "green";
    }
  }

  window.ethereum.on('accountsChanged', async function(accounts) {
    const account = accounts[0];
    localStorage.setItem("account", account);
    let shortHandAccount = account.slice(0, 4) + "..." + account.slice(-4);
    document.getElementById("metamask-buynft").innerHTML = shortHandAccount;
    document.getElementById("metamask-buynft").style.backgroundColor = "green";
    });

    

const connectmetamask = async () => {
    let account;
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        let shortHandAccount = account.slice(0, 4) + "..." + account.slice(-4);
        document.getElementById("metamask-buynft").innerHTML = shortHandAccount;
        document.getElementById("metamask-buynft").style.backgroundColor = "green";
        localStorage.setItem("buttonClicked", "true");
        localStorage.setItem("account", account);
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

    let account=localStorage.getItem('account');

    console.log(account);

    let token=await window.contract.methods.listedNFTs(buyToken).call();

    console.log(token);

    let tokenPrice=Number(token.price);
    let totalPrice=10*(tokenPrice)/100+tokenPrice;

    console.log(totalPrice);
    console.log(tokenPrice);
    await window.contract.methods.buyNFT(buyToken).send({value: totalPrice, from: account});
    await window.contract.methods.listABoughtNFT(buyToken).send({value:1000, from:account})
   
}