# OfficeDogs

```
Prerequisites:
 - A unix/linux machine with node.js v8.11.2 or greater.
 - git installed
To install:
1. Clone the Repository to your local unix/linux machine.
2. cd into the projects directory
3. Run npm install

To run:
1. In the root directory, run node index.js

```
Using Postman, the following endpoints are available:

http://localhost:8080/api/dogs
    - get : get all dogs
    - post : add a new dog
http://localhost:8080/api/dogs/:id
    - get : get dog by id
    - put : update dog by id
    - delete : delete dog by id
