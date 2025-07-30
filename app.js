const express = require("express");
const logger = require("morgan");

const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");

const app = express();

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose.connect(MONGODB_URI)
    .then((x) => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
    .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res, next) => {

    const newRecipe = req.body;

    Recipe.create(newRecipe)
        .then((recipesFromDb) => {
            res.status(201).json(recipesFromDb)
        })
        .catch((error) => {
            console.log("error creating a recipe in the database", error)
            res.status(500).json({ errorMessage: "Failed to create a new recipe" })
        })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
    Recipe.find({})
        .then((recipesFromDb) => {
            res.status(200).json(recipesFromDb)
        })
        .catch((error) => {
            console.log("error getting recipes from the database", error)
            res.status(500).json({ errorMessage: "Failed to get all recipes" })
        })

})


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next) => {

    const { id } = req.params;

    Recipe.findById(id)
        .then((recipesFromDb) => {
            res.status(200).json(recipesFromDb)
        })
        .catch((error) => {
            console.log("error getting a recipe from the database", error)
            res.status(500).json({ errorMessage: "Failed to get single recipe" })
        })

})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next) => {
    
    const { id } = req.params;

    const newData = req.body;

    Recipe.findByIdAndUpdate(id, newData, { new: true })
        .then((recipesFromDb) => {
            res.status(200).json(recipesFromDb)
        })
        .catch((error) => {
            console.log("error updating a recipe from the database", error)
            res.status(500).json({ errorMessage: "Failed to update a single recipe" })
        })

})


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res, next) => {

    const { id } = req.params;

    Recipe.findByIdAndDelete(id)
        .then(() => {
            res.status(204).send()
        })
        .catch((error) => {
            console.log("error deleting a recipe from the database", error)
            res.status(500).json({ errorMessage: "Failed to delete a single recipe" })
        })
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
