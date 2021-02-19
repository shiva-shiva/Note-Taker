const express = require ('express');
const fs = require('fs')
const path = require('path');
const PORT = 3000

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
    const newNote = req.body;
    noteList.push(newNote)
    fs.writeFileSync( saveFile, JSON.stringify(noteList) )
    res.send( { message: `Reserved for *${newNote.name}*` } )
})

app.delete('/api/notes/:id', function(req, res){
    noteList.splice(req.params.id, 1)
    //fs.writeFileSync( saveFile, JSON.stringify(noteList) )
    res.send( { message: `Delete `} )
})


app.listen(PORT , function(){
    console.log(`app running on port ${PORT}`)
})