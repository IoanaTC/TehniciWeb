// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Application
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/beers", (req, res) => {
  const beersList = readJSONFile();
  
  req.body.id = uuid.v4.apply();
  beersList.push(req.body);
  writeJSONFile(beersList);

  res.status(200).send(req.body);
});

// Read All
app.get("/beers", (req, res) => {
  const beersList = readJSONFile();
  
  if(beersList!=undefined && beersList.length){
      res.status(200).send(beersList);
  }
  else res.status(204).send("No beer found!");
});

// Update
app.put("/beers/:id", (req, res) => {
  const beersList = readJSONFile();
  
  const beerId = req.params.id;
  let foundBeer=null;

  for(let i=0; i<beersList.length; i++){
      if(beersList[i].id===beerId){
          //updatam datele;
          beersList[i].name = req.body.name;
          beersList[i].img = req.body.img;
          beersList[i].place = req.body.place;
          foundBeer = beersList[i];
          break;
      }
  }
  writeJSONFile(beersList);
  if(foundBeer){
      res.status(200).send(foundBeer);
  }
  else res.status(204).send("No beer found!");

});

// Delete
app.delete("/beers/:id", (req, res) => {
  const beersList = readJSONFile();
  
  const beerId = req.params.id;

  for(let i=0; i<beersList.length; i++){
      if(beersList[i].id === beerId){
          beersList.splice(i, 1); //sterge un element incepand cu pozitia i
          break;
      }
  }
  writeJSONFile(beersList);
  res.status(200).send("Beer deleted!");
});

// Reading function from db.json file
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["beers"];
}

// Writing function from db.json file
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ beers: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Starting the server
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);