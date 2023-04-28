window.onload = function() {
    let account=localStorage.getItem("account");
    console.log(account);
    if(localStorage.getItem("buttonClicked") === "true") {
    let shortHandAccount = account.slice(0, 4) + "..." + account.slice(-4);
    document.getElementById("metamask-mynft").innerHTML = shortHandAccount;
    document.getElementById("metamask-mynft").style.backgroundColor = "green";
    }
  }

  window.ethereum.on('accountsChanged', async function(accounts) {
    const account = accounts[0];
    localStorage.setItem("account", account);
    let shortHandAccount = account.slice(0, 4) + "..." + account.slice(-4);
    document.getElementById("metamask").innerHTML = shortHandAccount;
    document.getElementById("metamask").style.backgroundColor = "green";
    });

const connectmetamask = async () => {
    let account;
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
        let shortHandAccount = account.slice(0, 4) + "..." + account.slice(-4);
        document.getElementById("metamask-mynft").innerHTML = shortHandAccount;
        document.getElementById("metamask-mynft").style.backgroundColor = "green";
        localStorage.setItem("buttonClicked", "true");
        localStorage.setItem("account", account);
    }
    else {
        alert("Kindly install metamask")
    }
    };

const showmyNFTs=async()=> {
    let account;
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    console.log(account);
    const contractABI = await fetch("/NFTMktplace.json");
    const abidata = await contractABI.json();
    console.log(abidata);
    const contractAddress = await fetch("/Address.json");                        
    const addressdata = await contractAddress.json();
    const ABI = abidata.abi;
    console.log(ABI);
    const Address = addressdata.address;
    console.log(Address);

    window.web3 = new Web3(window.ethereum);
    window.contract = new window.web3.eth.Contract(ABI, Address);


    let myitemcount=await window.contract.methods.getNFTBalance(account).call();


    console.log(myitemcount);
    
    for(i=0;i<myitemcount;i++) {
    let myNFTs=await window.contract.methods.getNFTs(account).call();

    console.log(myNFTs);
    console.log(myNFTs[i].imageURI);

    let parentdiv=document.querySelector(".my-nft-area");
    let childdiv = document.createElement("div");
    childdiv.setAttribute("id","image-card");
    let grandchildimg=document.createElement("img");
    let grandchildiv=document.createElement("div");
    grandchildiv.innerHTML=myNFTs[i].price;
    console.log(myNFTs[i].price);

    grandchildimg.setAttribute("src",myNFTs[i].imageURI);
    console.log(myNFTs);
    console.log(myNFTs[i].imageURI);
    childdiv.appendChild(grandchildimg);
    childdiv.appendChild(grandchildiv);
    parentdiv.appendChild(childdiv);               
    }

    document.getElementById("show-my-NFTs").style.display="none";
}