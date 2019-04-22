/**
* Controller file adds a layer of abstraction between the data models and the
* router. It allows us to modify each part of the API separate of one another apart
* from some input validation on params and body
*/

var dogController = function(Dog){

    /**
    * A routed function to return all dogs
    */
    var get = function(req, res){
        Dog.getAllDogs(req, function(err, dogs){
            console.log("[/] - get")
            if(err) res.status(500).send(err)
            else res.json(dogs)
        })
    }

    /**
    * A routed function to create a new dog.
    * Input validation on both the dogname and the ownername
    */
    var post = function(req, res){
        if (!req.body.dogname || !req.body.ownername) {
            res.status(400)
            res.send("To post a new dog, you must include the dog's name as well as the owner's name.")
        } else {
            console.log("[/] - post")
            Dog.newDog(req, function(err, dog){
                if(err) {
                    res.status(500).send(err)
                } else {
                    res.status(201);
                    res.json(dog);
                }
            })
        }
    }


    /**
    * A routed function to return a specific dog by its ID
    * Input validation that the id is present
    */
    var getById = function(req, res) {
        if (!req.params.id) {
            res.status(400)
            res.send("Must have :id")
        } else {
            console.log("[/:id] - get")
            Dog.getById(req, function(err, dog){
                if(err) {
                    res.status(500).send(err)
                } else {
                    res.status(201);
                    res.json(dog);
                }
            })
        }
    }
    /**
    * A routed function that will update a dog by its specific ID
    * Input validation that the id is present and that the request is
    * attempting to update valid attributes
    */
    var update = function(req, res) {
        if (!req.params.id) {
            res.status(400)
            res.send("Must have :id")
        } else {
            console.log("[/:id] - put")
            var valid = true;
            for(var key in req.body){
                if (key != "dogname" && key != "ownername" && key != "notes") {
                    res.status(400)
                    res.send("Only dogname, ownername, and notes are editable")
                    valid = false;
                }
            }
            if (valid){
                Dog.update(req, function(err, dog){
                    if(err) {
                        res.status(500).send(err)
                    } else {
                        res.status(201);
                        res.json(dog);
                    }
                })
            }
        }
    }
    /**
    * A routed function that will delete a dog by its unique ID
    */
    var deleteDog = function(req, res) {
        if (!req.params.id) {
            res.status(400)
            res.send("Must have :id")
        } else {
            console.log("[/:id] - delete")
            Dog.deleteDog(req, function(err, dog){
                if(err) {
                    res.status(500).send(err)
                } else {
                    res.status(201);
                    res.send("Dog has been removed");
                }
            })
        }
    }


    return {
        get: get,
        post: post,
        getById: getById,
        update: update,
        deleteDog: deleteDog
    }
}

module.exports = dogController;
