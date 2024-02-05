import React, { useState,useContext, useEffect } from 'react'
import noteContext from "../Components/Context/Notes/NoteContext"

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
   

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
      
            setNote({title:"",description:"",tag:""});
         
       
        props.showAlert("Added successfully","success")
    }
    
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
    return (
        <div className='container'>
            <h1>Add a Note</h1>
            <form>
                <div class="form-group">
                    <label htmlFor="title" className='mb-2'>title</label>
                    <input type="text" class="form-control" id="title" value={note.title}  name="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} />
                </div>
                <div class="form-group">
                    <label htmlFor="description" className='my-2'>Description</label>
                    <input type="text" class="form-control" id="description" value={note.description} name="description" placeholder="description" onChange={onChange} />
                </div>
                <div class="form-group">
                    <label htmlFor="tag" className='my-2'>Tag</label>
                    <input type="text" class="form-control" id="tag" name="tag" placeholder="tag" value={note.tag} onChange={onChange} />
                </div>

                <button onClick={handleClick} type="submit" class="btn my-3 btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddNote