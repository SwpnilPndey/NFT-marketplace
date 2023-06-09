const express=require("express");
const path=require("path");
const server=express();
const port=process.env.PORT||3001;

require('dotenv').config();
const pinataApiKey = process.env.pinataApiKey;
const pinataSecretApiKey = process.env.pinataSecretApiKey;


server.use(express.static(__dirname));
server.use(express.static(__dirname + '/public'));
server.use(express.static("/home/swapnil/Documents/github/NFT-marketplace/backend/build/contracts"));

console.log(__dirname + '/public');

server.use((req, res, next) => {
    const ext = req.url.split('.').pop();
    if (ext === 'css') {
      res.set('Content-Type', 'text/css');
    } else if (ext === 'js') {
      res.set('Content-Type', 'application/javascript');
    }
    next();
  });

  server.get("/",(req,res)=> {
    res.sendFile(path.join(__dirname+"/src/index.html"))
})

server.get("/mintnft",(req,res)=> {
  res.sendFile(path.join(__dirname+"/src/mint.html"))
})

server.get("/buynft",(req,res)=> {
  res.sendFile(path.join(__dirname+"/src/buynft.html"))
})

server.get("/mynft",(req,res)=> {
  res.sendFile(path.join(__dirname+"/src/mynft.html"))
})


server.get("/NFTMktplace.json", (req, res) => {
  res.sendFile(path.join(__dirname+"/public/NFTMktplace.json"));
});

server.get("/Address.json", (req, res) => {
  res.sendFile(path.join(__dirname+"/public/Address.json"));
});

server.get("/pinata.json", (req, res) => {
  res.sendFile(path.join(__dirname+"/public/pinata.json"));
});

server.listen(port,()=> {
	console.log(`Server running at ${port}`);
});