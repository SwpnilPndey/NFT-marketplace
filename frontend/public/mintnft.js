const pinataApiKey = 'f179f29f1fc975240c11';
const pinataSecretApiKey = 'd841998c3dd00ea10e47546775c6750ca8b76306d8fd3163b009802d373405ed';


window.onload = function() {
    let account=localStorage.getItem("account");
    console.log(account);
    if(localStorage.getItem("buttonClicked") === "true") {
    let shortHandAccount = account.slice(0, 4) + "..." + account.slice(-4);
    document.getElementById("metamask-mint").innerHTML = shortHandAccount;
    document.getElementById("metamask-mint").style.backgroundColor = "green";
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
        document.getElementById("metamask-mint").innerHTML = shortHandAccount;
        document.getElementById("metamask-mint").style.backgroundColor = "green";
        localStorage.setItem("buttonClicked", "true");
        localStorage.setItem("account", account);
    }
    else {
        alert("Kindly install metamask")
    }
    };
       
    
const mintNFT = async () => {
    const NFTname = document.getElementById('form-NFTname').value;
    const NFTsymbol = document.getElementById('form-NFTsymbol').value;
    const NFTprice = document.getElementById('form-NFTprice').value;
    const fileInput = document.getElementById('form-NFTfile');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('pinataMetadata', JSON.stringify({
    name: file.name
    }));

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                            method: 'POST',
                            headers: {
                                    'pinata_api_key': pinataApiKey,
                                    'pinata_secret_api_key': pinataSecretApiKey,
                            },
                            body: formData,
                            });

    console.log(response);

    const imgHash = await response.json();
    
    const tokenURI = "https://gateway.pinata.cloud/ipfs/" + imgHash.IpfsHash;
            
    console.log(imgHash);
    console.log(tokenURI);

    const contractABI = await fetch("/NFTMktplace.json");
    const abidata = await contractABI.json();
    const contractAddress = await fetch("/Address.json");                        
    const addressdata = await contractAddress.json();
    const ABI = abidata.abi;
    const Address = addressdata.address;

    
    console.log(ABI);
    console.log(Address);


    window.web3 = new Web3(window.ethereum);
    window.contract = new window.web3.eth.Contract(ABI, Address);

    let account;
    const accounts=await ethereum.request({method:"eth_requestAccounts"});
    account=accounts[0];
    await window.contract.methods.mintAndListNFT(NFTname, NFTsymbol,tokenURI ,NFTprice).send({value: 1000, from: account});
    console.log(account);
};

