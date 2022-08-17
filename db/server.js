const express = require('express');
const path =require('path');
const fs = require('fs');
const util = require('util');
const e = require('express');

// handling async props 

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


// setting up the server
const app = express ();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extened: true }));
app.use(express.json());

// static middleware
app.use(express.static("./develop/public"));


// API
// app.get("/api/notes", function(req, res) {
//     readFileAsync("./develop/db/db.json", "utf8").then(function(data)) {
//         notes = [].connect(JSON.parse(data))
//         res.json(notes);
//     }
// })

app.get("/", (req, res) =>
    res.sendFiles(path.join(__dirname, "public/index.html"))
    );


app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) => res.json(termData));

app.post("/api/notes", (req,res) => {
    console.info(`${req.method} request recieved`)
const { title, text } = req.body;
let newNote = { text: "", title: "", id: ""};

if (title && text) {
    newNote = {
        title,
        text,
        id: uuidv4(),
    };
    const response = {
        status: "success",
        body: newNote,
    };
    console.log(response);
    termData.push(newNote);
}
    fs.writeFile("./db/db.json", JSON.stringify(termData), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("note  saved");
    });


    res.json(newNote);

});
app.delete("/api/notes/:id", (req, res) => {
    console.log('params', req.params.id)
    console.log(`${req.method} request received`)

    for (let i = 0; i < termData.length; i++) {

        if (termData[i].id == req.params.id) {
            // Splice takes i position, and then deletes the 1 note.
            termData.splice(i, 1);
            break;
        }
    }
    /*
      get id from param
      filter out the id you got from param to get an array that does not include
    */
    fs.writeFile("./db/db.json", JSON.stringify(termData), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Your note is deleted!");
        res.json({ noteId: req.params.id })
    });


})

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);


