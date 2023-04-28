window.onload = function() {
    let account=localStorage.getItem("account");
    console.log(account);
    if(localStorage.getItem("buttonClicked") === "true") {
    let shortHandAccount = account.slice(0, 4) + "..." + account.slice(-4);
    document.getElementById("metamask").innerHTML = shortHandAccount;
    document.getElementById("metamask").style.backgroundColor = "green";
    }
  };

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
        document.getElementById("metamask").innerHTML = shortHandAccount;
        document.getElementById("metamask").style.backgroundColor = "green";
        localStorage.setItem("buttonClicked", "true");
        localStorage.setItem("account", account);
    }
    else {
        alert("Kindly install metamask")
    }
    };

const showNFTs=async()=> {
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


    let itemcount=await window.contract.methods.itemCount().call();

    console.log(itemcount);
    
    for(i=0;i<itemcount;i++) {
    let myNFT=await window.contract.methods.listedNFTs(i).call();
    let parentdiv=document.querySelector(".nft-area");
    let childdiv = document.createElement("div");
    childdiv.setAttribute("id","image-card");
    let grandchildiv1=document.createElement("div");
    let grandchildimg=document.createElement("img");
    let grandchildiv2=document.createElement("div");
    grandchildiv1.innerHTML="Token ID - "+ myNFT.tokenID;
    grandchildiv2.innerHTML=myNFT.price+" wei";
    grandchildimg.setAttribute("src",myNFT.imageURI);
    console.log(myNFT);
    console.log(myNFT.imageURI);
    childdiv.appendChild(grandchildiv1);
    childdiv.appendChild(grandchildimg);
    childdiv.appendChild(grandchildiv2);
    parentdiv.appendChild(childdiv);               
    }

    document.getElementById("show-NFTs").style.display="none";



    
}

    