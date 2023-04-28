//SPDX-License-Identifier:GPL-3.0

pragma solidity ^0.8.18;

 struct NFT {
        uint tokenID;
        string tokenName;
        string tokenSymbol;
        string imageURI;
        uint price;
        address owner;
        bool listed;
        bool sold;
    }

contract NFTMktplace {
    mapping(uint=>NFT) public listedNFTs;
    uint public itemCount;
    address contractOwner;

    constructor() {
        contractOwner=msg.sender;
    }
        
    function mintAndListNFT(string memory _name, string memory _symbol, string memory _URI,uint _price) public payable {
        require(msg.value>=1000,"Kindly send required fees to mint and list NFT");
        listedNFTs[itemCount]=NFT({
        tokenID:itemCount,
        tokenName: _name,
        tokenSymbol: _symbol,
        imageURI: _URI,
        price: _price,
        owner: msg.sender,
        listed: true,
        sold: false
        });
        itemCount++;
    }

    
    function buyNFT(uint _tokenID) public payable {
        uint finalPrice=listedNFTs[_tokenID].price+10*listedNFTs[_tokenID].price/100;
        require(msg.value>=finalPrice,"Kindly send required final price to buy the NFT");
        require( listedNFTs[_tokenID].owner!=msg.sender,"You can't buy your own NFT");
        require(listedNFTs[_tokenID].listed==true,"The item is not listed");
        payable(listedNFTs[_tokenID].owner).transfer(listedNFTs[_tokenID].price);
        listedNFTs[_tokenID].owner=msg.sender;
        listedNFTs[_tokenID].listed=false;
        listedNFTs[_tokenID].sold=true;
    }

    function listABoughtNFT(uint _tokenID) public payable {
        require(msg.sender==listedNFTs[_tokenID].owner,"You are not the owner");
        require(msg.value>=1000,"Kindly send required wei to list NFT");
        require(listedNFTs[_tokenID].sold==true,"The item is not sold yet");
        listedNFTs[_tokenID].listed=true;
        listedNFTs[_tokenID].sold=false;
    }

    function getNFTFromID(uint _tokenID) public view returns(NFT memory) {
        return listedNFTs[_tokenID];
    }

    function getNFTBalance(address _owner) public view returns(uint) {
        uint balance;
        for(uint i=0;i<itemCount;i++) {
            if(listedNFTs[i].owner==_owner) {
                balance++;
            }
        }
        return balance;
    }
       
    function getNFTs(address _owner) public view returns(NFT[] memory) {
        uint ownerBalance=getNFTBalance(_owner);
        NFT[] memory ownerNFT=new NFT[](ownerBalance);
        uint i=0;
        for (uint j=0;j<itemCount && i<ownerBalance;j++) {
            if(listedNFTs[j].owner==_owner) {
                ownerNFT[i]=listedNFTs[j];
                i++;
            }

        }
        
        return ownerNFT;
    }

    receive() external payable {
    }

    function withdraw() public payable {
        payable(contractOwner).transfer(address(this).balance);
    }

}