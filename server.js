const express = require('express');
const path =require('path');
const fs = require('fs');
const util = require('util');

// setting up the server
const PORT = process.env.PORT || 3001;
const app = express();

// handling async props 

// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// ?????

const allNotes = require('./db/db.json');

// static middleware
app.use(express.urlencoded({ extened: true }));
app.use(express.json());
app.use(express.static('public'));


// get routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, './public/index.html'));
});

// creating notes function

function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

// post route for notes
app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});

// delete function
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


// app.post("/api/notes", (req,res) => {
//     console.info(`${req.method} request recieved`)
// const { title, text } = req.body;
// let newNote = { text: "", title: "", id: ""};

// if (title && text) {
//     newNote = {
//         title,
//         text,
//         id: uuidv4(),
//     };
//     const response = {
//         status: "success",
//         body: newNote,
//     };
//     console.log(response);
//     termData.push(newNote);
// }
//     fs.writeFile("./db/db.json", JSON.stringify(termData), function (err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("note  saved");
//     });


//     res.json(newNote);

// });
// app.delete("/api/notes/:id", (req, res) => {
//     console.log('params', req.params.id)
//     console.log(`${req.method} request received`)

//     for (let i = 0; i < termData.length; i++) {

//         if (termData[i].id == req.params.id) {
//             // Splice takes i position, and then deletes the 1 note.
//             termData.splice(i, 1);
//             break;
//         }
//     }
//     /*
//       get id from param
//       filter out the id you got from param to get an array that does not include
//     */
//     fs.writeFile("./db/db.json", JSON.stringify(termData), function (err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("Your note is deleted!");
//         res.json({ noteId: req.params.id })
//     });


// })

// app.listen(PORT, () =>
//     console.log(`Example app listening at http://localhost:${PORT}`)
// );


