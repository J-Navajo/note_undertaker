var db = require("../db/db.json")
var fs = require("fs")
var id = db.length + 1
function apiRoutes(app) {
    app.get("/api/notes", function (req, res) {
        res.json(db)
    })
    //  post is adding data the user inserted to the database
    app.post("/api/notes", function (req, res) {

        req.body.id = id++
        var newNote = req.body

        db.push(newNote)

        fs.writeFile("./db/db.json", JSON.stringify(db), function (error, data) {
            res.json(db)
        })

    })
    app.delete("/api/notes/:id", function (req, res) {
        var id = req.params.id
        console.log(id)
        for (var i = 0; i < db.length; i++) {
            if (db[i].id === parseInt(id)) {
                db.splice(i, 1);
            }
        }
        fs.writeFile("./db/db.json", JSON.stringify(db), function (error, data) {
            res.json(db)
        })
       

    })

}

module.exports = apiRoutes;