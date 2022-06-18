var express = require('express');
let fs = require('fs');

var router = express.Router();

let readFile = function(fileName) {
  if (fs.existsSync(fileName)) {
    let rawData = fs.readFileSync(fileName);
    return JSON.parse(rawData);
  }
  return [];
}

let saveToFile = function(fileName, newData) {
  let strData = JSON.stringify(newData);
  fs.writeFileSync(fileName, strData);
}

let serverArray = [];

let foodRecipe = function(pName, pIngredient1,pIngredient2, pIngredient3, pIngredient4, pIngredient5, pMethod, pEquipment, pCategory) {
    this.Name = pName;
    this.Ingredient1 = pIngredient1;
    this.Ingredient2 = pIngredient2;
    this.Ingredient3 = pIngredient3;
    this.Ingredient4 = pIngredient4;
    this.Ingredient5 = pIngredient5;
    this.Method = pMethod;
    this.Equipment = pEquipment;
    this.Category = pCategory;
    this.ID = Math.random().toString().slice(5)
}

serverArray.push(new foodRecipe("Soup", "Potato", "Carrot", "Onion", "Meatballs", "Tomatoes", "Put all ingredients in a pot and cook 20 min", "a pot", "Dinner"));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});
router.get('/getAllRecipes', function(req, res) {
  serverArray = readFile('myRecipes.json');
  res.status(200).json(serverArray);

});

router.post('/addRecipe', function(req, res) {
  serverArray.push(req.body);
  saveToFile('myRecipes.json', serverArray);
  res.status(200).json(req.body);
});

module.exports = router;
