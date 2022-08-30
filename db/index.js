const fs = require("fs");
const util = require("util");

const readJson = util.promisify(fs.readFile);
const writeToJson = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readJson("./db/db.json", "utf8");
  }

  write(notes) {
    return writeToJson("./db/db.json", JSON.stringify(notes));
  }

  readAllNotes() {
    return this.read().then((notes) => {
      let allNotes;

      try {
        allNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        allNotes = [];
      }
      return allNotes;
    });
  }

  writeNotes(note) {
    return this.readAllNotes()
      .then((notes) => [...notes, note])
      .then((updatedNotes) => this.write(updatedNotes));
  }
}

module.exports = new Notes();