/**
* Model file represents the data layer of the API. This handles the reading/writing
* to the database as well as any updates/deletes. 
*/


const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');


var Dog = function(database){
    /**
    * The structure of the dog object.
    * The notes parameter can be optional
    */
    var dogModel = function(dogname, ownername, notes){
        this.dogname = dogname;
        this.ownername = ownername;
        this.id = uuidv1();
        this.notes = (notes == undefined) ? "There are no notes about this dog" : notes;
    }
    /**
    * A function that will read our database (sync) and return all dogs.
    */
    var getAllDogs = function(req, cb){

        let rawdata = fs.readFileSync(__dirname + "/../"+database);
        let dogs = JSON.parse(rawdata);

        cb(null, dogs)
    }

    /**
    * A function that will create a new dog json object and save it in our database (sync)
    */
    var newDog = function(req, cb) {

        var newdog = new dogModel(req.body.dogname, req.body.ownername, req.body.notes);
        let rawdata = fs.readFileSync(__dirname + "/../"+database);
        var dogs = JSON.parse(rawdata);
        dogs[newdog.id] = newdog;
        let data = JSON.stringify(dogs);
        fs.writeFileSync(__dirname + "/../"+database, data);

        cb(null, newdog);
    }
    /**
    * A function that will read our database and return a dog by their unique ID
    */
    var getById = function(req, cb) {

        let rawdata = fs.readFileSync(__dirname + "/../"+database);
        let dogs = JSON.parse(rawdata);
        if (req.params.id in dogs) {
            var ret = dogs[req.params.id];
            cb(null, ret);
        } else {
            cb(err)
        }
    }
    /**
    * A function that read our database and update a dog object based on its ID
    * and save it to our DB (sync)
    */
    var update = function(req, cb) {
        let rawdata = fs.readFileSync(__dirname + "/../"+database);
        var dogs = JSON.parse(rawdata);

        if (req.params.id in dogs) {
            var dogToUpdate = dogs[req.params.id];
            for(var key in req.body) {
                dogToUpdate[key] = req.body[key]
            }
            let data = JSON.stringify(dogs);
            fs.writeFileSync(__dirname + "/../"+database, data);
            cb(null, dogs);
        } else {
            cb(err)
        }
    }
    /**
    * A function that will find a dog in our DB by its ID and remove it.
    */
    var deleteDog = function(req, cb) {
        let rawdata = fs.readFileSync(__dirname + "/../"+database);
        var dogs = JSON.parse(rawdata);

        if (req.params.id in dogs) {
            delete dogs[req.params.id]
            let data = JSON.stringify(dogs);
            fs.writeFileSync(__dirname + "/../"+database, data);
            cb(null, dogs);
        } else {
            cb(err)
        }
    }


    // return available function for the controller to use
    return {
        getAllDogs: getAllDogs,
        newDog: newDog,
        getById: getById,
        update: update,
        deleteDog: deleteDog
    }
}

module.exports = Dog;
