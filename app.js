const fs = require('fs')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')



//add, remove, read, list

//Add:
yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder: {
        title: {
            describe: 'Note Title.',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of Note.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log(argv)
        //Try with 'this' instead of argv as arguments for addNote
        //notes.addNote(argv.title,argv.body)
    }
})

//Remove:
yargs.command({
    command: 'remove',
    describe: 'Removing a note.',
    builder: {
        title: {
            describe: 'Note Title.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){    
        notes.removeNote(argv.title)
    }
})

//Read:
yargs.command({
    command: 'read',
    describe: 'Reading a note.',
    builder: {

        title: {
            describe: 'Note Title.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNotes(argv.title)
    }
})
//List:
yargs.command({
    command: 'list',
    describe: 'List your notes.',
    handler(){
        notes.listNotes()
    }
})

yargs.parse()