import React, { useEffect, useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const host = "http://localhost:4000"
    const noteinitial = []


    const [note, setnote] = useState(noteinitial)

    //GEt all notes
    const getNotes =async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
            
        });
        const json=await response.json()
        setnote(json)




    }

    //Add a Note
    const addNote =async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });


        const notee = {
            "_id": "65b21b221a00439fb13be766",
            "user": "65b21a331a00439fb13be755",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-01-25T08:26:10.864Z",
            "__v": 0
        };
        setnote(note.concat(notee))

    }

    //Delete a Note
    const deleteNote = async(id) => {
        //API CAll for delete
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
           
        });
       const json=response.json();

        const newNotes = note.filter((note) => { return note._id !== id })
        setnote(newNotes)

    }

    let newNotes=JSON.parse(JSON.stringify(note))
    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API CAll
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
       const json=response.json();

        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id == id) {
                newNotes[i].title = title;
                newNotes[i].description = description
                newNotes[i].tag = tag;
                break;
            }
         
        }
        setnote(newNotes);
    }

    return (

        <NoteContext.Provider value={{ note, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState