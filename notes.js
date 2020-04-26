const fs = require('fs')
const chalk = require('chalk')

// const getNotes = () => {
//     return ("In getNotes()")
// }

//loadNotes:
//Read string content from .json file; Convert buffer into string; Parse and return as JSON object.
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('./notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
    
}

//saveNotes:
//Accept the JSON object and write back into file as string.
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('./notes.json',dataJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()

    // const dupesNotes = notes.filter((note)=> note.title === title)
    // const dupesNotes = notes.filter(function(note){
    //     return note.title === title
    // })

    const dupesNotes = notes.find(note => note.title === title)

    if (dupesNotes){
        console.log(chalk.red.inverse('Duplicate!'))

    }
    else{
        notes.push({
            title:title, 
            body:body})

        saveNotes(notes)
        console.log(chalk.green.inverse('Note '+ title+ ' successfully added!'))

    }
}

const removeNote = (title) => {
    
    const notes = loadNotes()
    
    const notesToKeep = notes.filter((note) => note.title !== title)
        
    // const notesToKeep = notes.filter(function(note){
    //     return note.title !== title
    // })

    saveNotes(notesToKeep)
    
    if(notes.length === notesToKeep.length){
        console.log(chalk.red.inverse('No notes removed.'))
    }
    else{
        console.log(chalk.green.inverse('Note '+ title+ ' successfully removed!'))
    }
}

const listNotes = () => {
    console.log(chalk.inverse('Your notes:\n'))
    const notes = loadNotes()
    notes.forEach( element => { console.log(element.title) });
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find(element => element.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else
        console.log(chalk.red.inverse("Note not found!"))
}

module.exports = {
// getNotes: getNotes,
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNotes : readNotes
}