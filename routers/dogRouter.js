/**
* Router file represents the various enpoints available for dogs.
*/

const express = require("express");

var routes = function(Dog){
    var dogRouter = express.Router();
    var dogController = require("../controllers/dogController")(Dog)

    // Root Level
    dogRouter.route('/')
    .get(dogController.get)
    .post(dogController.post);

    // Root level by ID
    dogRouter.route('/:id')
    .get(dogController.getById)
    .put(dogController.update)
    .delete(dogController.deleteDog);

    return dogRouter;

}


module.exports = routes;
