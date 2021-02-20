const express = require ('express');
const fs = require('fs')
const PORT = process.env.PORT || 3000

const app = express()

const saveFile = './db/db.json';

app.use(express.static('html'))
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let noteList = fs.existsSync(saveFile)?JSON.parse(fs.readFileSync(saveFile)):[]

app.get('/api/notes', function(req, res){
    res.send(noteList)
})

app.post('/api/notes', function(req, res){
    let newNote = req.body;
    noteList.push(newNote);
    noteList.forEach((item, i) => {
        item.id = i +1 ;
      });
    fs.writeFileSync( saveFile, JSON.stringify(noteList) )
    res.send( { message: `Reserved for *${newNote.name}*` } )
})
app.get("/api/notes/:id", function(req,res) {
    res.send(noteList[req.params.id]);
});
app.delete('/api/notes/:id', function(req, res){
    var index = noteList.map(x => {
        return x.id;
      }).indexOf(+req.params.id);
    noteList.splice(index, 1)
    fs.writeFileSync( saveFile, JSON.stringify(noteList) )
    res.send( { message: `Delete `} )
})
app.listen(PORT , function(){
    console.log(`app running on port ${PORT}`)
})